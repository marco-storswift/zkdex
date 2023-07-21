import styled from 'styled-components';
import React, {useEffect, useState} from "react";
import PoolsTitle from "./poolsTitle";
import EmptyPage from "./Empty";
import {useStore} from "../../../context";
import {MapConfig, Records} from "../../../model";
import {getConfigMappingValueFromV1, queryRecords} from "../../../api";
import LoadingPage from "./loadingPage";
import PositionList from "./positionList";
import CustomModal from "./CustomModal";
import {message} from "antd";
import {PROGRAM_LATEST} from "../../../constants";

export const DivStyle = styled.div`
  position: relative;
  background: rgb(255, 255, 255);
  border-radius: 16px;
  border: 1px solid rgb(210, 217, 238);
  padding: 12px 8px 8px;
  z-index: 1;
  transition: transform 250ms ease 0s;
  width: 100%;
`;
export default function PoolsCard() {

    const [state, dispatch] = useStore();
    /**
     * 设置钱包地址
     */
    const [address, setAddress] = useState("");
    const [records, setRecords] = useState([] as Records[]);
    const [configData, setConfigData] = useState({} as MapConfig)

    const [loading, setLoading] = useState(false)

    const [balanceData, setBalanceData] = useState({
        currentBalance: "0",
        allBalance: "0"
    })

    useEffect(() => {
        refreshRecordsAndConfig()
    }, [])

    async function refreshRecordsAndConfig() {
        setLoading(true)
        let response = await queryRecords({program: PROGRAM_LATEST})
        if (response && response.length) {
            dispatch({type: "records", value: response})
        } else {
            dispatch({type: "records", value: []})
        }
        let config = await getConfigMappingValueFromV1()
        if (config) {
            dispatch({type: "mapConfig", value: config})
        } else {
            dispatch({type: "mapConfig", value: {}})
        }
        setLoading(false)
    }

    useEffect(() => {
        if (configData && configData.total_supply) {
            setBalanceData({
                ...balanceData,
                allBalance: configData.total_supply
            })
            setLoading(false)
        }
    }, [configData])


    useEffect(() => {
        if (state) {
            setAddress(state.currentAddress);
            setRecords(state.records)
            setConfigData(state.mapConfig)
        }
    }, [state])
    const [openModel, setOpenModel] = useState(false)
    const [currentTitle, setTitle] = useState("")
    const [currentType, setCurrentType] = useState("create" as "create" | "add" | "extract")

    function closeModel() {
        setOpenModel(false)
    }

    return (<div>
        <PoolsTitle
            onClick={() => {
                if (!configData.total_supply) {
                    setCurrentType("create")
                    setTitle("Add Liquidity")
                    setOpenModel(true)
                } else {
                    message.info("Only one can be added!!")
                }

            }}/>

        <DivStyle>
            {
                loading ? <LoadingPage/> :
                    configData.total_supply ?
                        <PositionList
                            onClickType={(type) => {
                                setCurrentType(type)
                                setTitle(type === "add" ? "Add" : "Withdraw")
                                setOpenModel(true)
                            }}
                            address={address}
                            balanceData={balanceData}/> :
                        <EmptyPage/>
            }
        </DivStyle>

        <CustomModal
            balanceData={balanceData}
            address={address}
            records={records}
            configData={configData}
            open={openModel}
            title={currentTitle}
            type={currentType}
            onClose={closeModel}/>
    </div>)
}