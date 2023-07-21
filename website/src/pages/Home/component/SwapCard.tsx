/** @format */

import React, {useEffect, useState} from 'react';
import './cardinput.css';
import {BwqButton, DivStyle,} from '../../../components/StyleComponents';
import SwitchIcon from "./switchIcon";
import SwapHeader from "./SwapHeader";
import InputBgCard from "./InputBgCard";
import {
    PROGRAM_LATEST,
    SWAP_A_TO_B_PRIVATE,
    SWAP_A_TO_B_PUBLIC,
    SWAP_B_TO_A_PRIVATE,
    SWAP_B_TO_A_PUBLIC,
    TOKENS
} from "../../../constants";
import {MapConfig, Records, TokenType} from "../../../model";
import {useStore} from "../../../context";
import TokenUtils from "../../../utils/tokenUtils";
import {message} from "antd";
import RecordUtils from "../../../utils/recordUtils";
import {execute, getConfigMappingValueFromV1, queryRecords} from "../../../api";

function SwapCard() {
    const [state, dispatch] = useStore();
    const [configData, setConfigData] = useState({} as MapConfig);
    /**
     * 设置钱包地址
     */
    const [address, setAddress] = useState('');
    const [records, setRecords] = useState([] as Records[])
    useEffect(() => {
        if (state) {
            setAddress(state.currentAddress)
        }
    }, [state]);

    useEffect(() => {
        if (address) {
            refreshRecordsAndConfig()
        }
    }, [address])

    async function refreshRecordsAndConfig() {
        let response = await queryRecords({program: PROGRAM_LATEST})
        if (response && response.length) {
            setRecords(response)
            dispatch({type: "records", value: response})
        } else {
            setRecords([])
            dispatch({type: "records", value: []})
        }
        let config = await getConfigMappingValueFromV1()
        if (config) {
            setConfigData(config)
            dispatch({type: "mapConfig", value: config})
        } else {
            setConfigData({} as MapConfig)
            dispatch({type: "mapConfig", value: {}})
        }
    }

    const [swapData, setSwapData] = useState({
        inputValue1: "",
        inputValue2: "",
        selected1: TOKENS[0],
        selected2: TOKENS[1]
    })

    function getOtherToken(selected: TokenType) {
        let aa = TOKENS.find((item) => item != selected)
        if (aa) {
            return aa
        }
        return {} as TokenType
    }

    function getValue1ToValue2(selected: TokenType, value: string) {
        if (selected.id) {
            setSwapData({
                ...swapData,
                inputValue1: value,
                inputValue2: TokenUtils.fromTransferTo(value, configData.reserve_a, configData.reserve_b)
            })
        } else {
            setSwapData({
                ...swapData,
                inputValue1: value,
            })
        }
    }

    function getValue2ToValue1(selected: TokenType, value: string) {
        if (selected.id) {
            setSwapData({
                ...swapData,
                inputValue2: value,
                inputValue1: TokenUtils.toTransferFrom(value, configData.reserve_a, configData.reserve_b)
            })
        } else {
            setSwapData({
                ...swapData,
                inputValue2: value,
            })
        }
    }

    async function confirmSwap() {
        if (!address && swapData.inputValue1 && swapData.inputValue2) {
            message.error('Please enter address~');
            return;
        }
        if ((!swapData.inputValue1 || Number(swapData.inputValue1) == 0) || (!swapData.inputValue2 || Number(swapData.inputValue2) == 0)) {
            message.error('Cannot be less than 0!!');
            return;
        }
        // 判断是否是A->B
        let firstIsTokenA = swapData.selected1.tokenKey === TOKENS[0].tokenKey
        if (currentHead) {
            let executeData = {
                programID: PROGRAM_LATEST,
                functionName: firstIsTokenA ? SWAP_A_TO_B_PUBLIC : SWAP_B_TO_A_PUBLIC,
                inputs: `${address}&&${swapData.inputValue1}u64&&${swapData.inputValue2}u64`,
            };
            let data = await execute(executeData);
            data && message.success('合约正在执行');
            return
        }
        let tokenA = 0
        let tokenB = 0
        let useRecord;
        let functionName = SWAP_A_TO_B_PRIVATE
        let inputs = ""
        if (firstIsTokenA) {
            tokenA = Number(swapData.inputValue1)
            tokenB = Number(swapData.inputValue2)
            useRecord = RecordUtils.finRecordByName(records, tokenA, TOKENS[0].tokenValue);
            inputs = `${address}&&${useRecord.record}&&${tokenA}u64&&${tokenB}u64`
        } else {
            tokenA = Number(swapData.inputValue2)
            tokenB = Number(swapData.inputValue1)
            useRecord = RecordUtils.finRecordByName(records, tokenA, TOKENS[1].tokenValue);
            functionName = SWAP_B_TO_A_PRIVATE
            inputs = `${address}&&${tokenA}u64&&${useRecord.record}&&${tokenB}u64`
        }
        if (!useRecord.record) {
            message.error('Not record');
            return;
        }
        // TODO 需要优化 swapA或者swapB只使用一个方法
        let executeData = {
            programID: PROGRAM_LATEST,
            functionName: functionName,
            inputs: inputs,
        };
        let data = await execute(executeData);
        data && message.success('合约正在执行');
    }

    const [currentHead, setCurrentHead] = useState(false)

    function changeSwapType(checked: boolean) {
        setCurrentHead(checked)
        setSwapData({
            inputValue1: "",
            inputValue2: "",
            selected1: TOKENS[0],
            selected2: TOKENS[1]
        })
    }

    return (
        <div style={{marginTop: "80px"}}>
            <DivStyle>
                <SwapHeader currentSelected={currentHead} onChangeHeader={changeSwapType}/>
                <InputBgCard
                    inputChange={(value) => {
                        getValue1ToValue2(swapData.selected1, value)
                    }}
                    inputValue={swapData.inputValue1}
                    currentSelected={swapData.selected1}
                    selectedChange={(selected) => {
                        setSwapData({
                            ...swapData,
                            selected1: selected,
                            selected2: getOtherToken(selected)
                        })
                    }}
                />
                <SwitchIcon onSwitch={() => {
                    let oldSwapData = {
                        ...swapData
                    }
                    setSwapData({
                        inputValue1: oldSwapData.inputValue2,
                        inputValue2: TokenUtils.fromTransferTo(oldSwapData.inputValue2, configData.reserve_a, configData.reserve_b),
                        selected1: oldSwapData.selected2,
                        selected2: oldSwapData.selected1
                    })
                }}/>
                <InputBgCard
                    inputChange={(value) => getValue2ToValue1(swapData.selected2, value)}
                    inputValue={swapData.inputValue2}
                    currentSelected={swapData.selected2}
                    selectedChange={(selected) => {
                        setSwapData({
                            ...swapData,
                            selected1: getOtherToken(selected),
                            selected2: selected
                        })
                    }}
                />
                <BwqButton style={{
                    backgroundColor: address ? "rgba(251, 17, 142, 0.12)" : "rgb(245, 246, 252)",
                    color: address ? "rgb(251, 17, 142)" : "rgb(119, 128, 160)"
                }} disabled={address ? false : true}
                           onClick={confirmSwap}
                >Swap</BwqButton>
            </DivStyle>
        </div>
    );
}

export default SwapCard;