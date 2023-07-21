import {message, Space, Typography} from "antd";
import InputBgCardA from "./InputBgCardA";
import {BURN_PUBLIC, PROGRAM_LATEST, TOKENS} from "../../../constants";
import {BwqButton} from "../../../components/StyleComponents";
import React, {useEffect, useState} from "react";
import {MapConfig, Records} from "../../../model";
import {execute} from "../../../api";


interface ExtractPositionProps {
    address: string
    configData: MapConfig
    records: Records[]
    cBalance: {
        currentBalance: string,
        allBalance: string
    }
    open: boolean
}

export default function ExtractPosition(props: ExtractPositionProps) {
    const {address, configData, records, cBalance,open} = props
    const [extractData, setExtractData] = useState({
        tokenA: "",
        tokenB: "",
        address: address
    })
    useEffect(() => {
        setExtractData({
            tokenA: "",
            tokenB: "",
            address: address
        })
    }, [open])

    async function confirmExtract() {
        if (!(extractData.address && extractData.tokenA && extractData.tokenB)) {
            message.error("Complete all required fields!")
            return
        }
        let params = {
            programID: PROGRAM_LATEST,
            functionName: BURN_PUBLIC,
            inputs: `${extractData.address}&&${extractData.tokenA}u64&&${extractData.tokenB}u64`
        }
        let req = await execute(params)
        req && message.success("合约正在执行");
    }
    return (<div>
        <Space
            direction={"vertical"}
            size={"large"}
            style={{width: "100%", marginTop: "8px"}}>
            <InputBgCardA
                inputChange={(value) => {
                    setExtractData({
                        ...extractData,
                        tokenA: value
                    })
                }}
                inputValue={extractData.tokenA}
                currentSelected={TOKENS[0]}
            />

            <InputBgCardA
                inputChange={(value) => {
                    setExtractData({
                        ...extractData,
                        tokenB: value
                    })
                }}
                inputValue={extractData.tokenB}
                currentSelected={TOKENS[1]}
            />
            <InputBgCardA
                normalInput
                inputChange={(value) => {
                    setExtractData({
                        ...extractData,
                        address: value
                    })
                }}
                inputValue={extractData.address}
                currentSelected={TOKENS[1]}
            />
        </Space>
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
        }}>
            <Typography></Typography>
            <Space direction={"horizontal"}
                   style={{
                       display: "flex",
                       justifyContent: "center",
                       alignItems: "center",
                       marginTop: "8px",
                       padding: "0 16px",
                   }}>
                <Typography style={{fontSize: "18px", fontWeight: 600}}>liquidity:</Typography>
                <Typography
                    style={{color: "red", fontSize: "18px", fontWeight: 600}}>{cBalance.currentBalance}</Typography>
                <Typography style={{fontSize: "18px", fontWeight: 600}}>/</Typography>
                <Typography style={{fontSize: "18px", fontWeight: 600}}>{cBalance.allBalance}</Typography>
            </Space>
        </div>

        <BwqButton
            style={{
                backgroundColor: address ? "rgba(251, 17, 142, 0.12)" : "rgb(245, 246, 252)",
                color: address ? "rgb(251, 17, 142)" : "rgb(119, 128, 160)"
            }}
            disabled={address ? false : true}
            onClick={confirmExtract}
        >提取</BwqButton>
    </div>)
}