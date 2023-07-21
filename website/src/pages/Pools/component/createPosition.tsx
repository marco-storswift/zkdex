import {message, Space, Typography} from "antd";
import InputBgCardA from "./InputBgCardA";
import {TOKENS} from "../../../constants";
import {BwqButton} from "../../../components/StyleComponents";
import React, {useEffect, useState} from "react";
import RecordUtils from "../../../utils/recordUtils";
import {mintPublic} from "../../../api";
import {MapConfig, Records} from "../../../model";

interface CreatePositionProps {
    address: string
    configData: MapConfig
    records: Records[]
    cBalance: {
        currentBalance: string,
        allBalance: string
    }
    buttonText: string,
    open: boolean
}

export default function CreatePosition(props: CreatePositionProps) {
    const {address, records, cBalance, buttonText, open} = props
    const [createData, setCreateData] = useState({
        tokenA: "",
        tokenB: ""
    })
    useEffect(() => {
        setCreateData({
            tokenA: "",
            tokenB: ""
        })
    }, [open])

    async function confirmCreate() {
        if (!(createData.tokenA && createData.tokenB)) {
            message.error("Complete all required fields!")
            return
        }
        let tokenARecord = RecordUtils.finRecordByName(records, Number(createData.tokenA), TOKENS[0].tokenValue)
        let tokenBRecord = RecordUtils.finRecordByName(records, Number(createData.tokenB), TOKENS[1].tokenValue)
        if (!(tokenARecord.record && tokenBRecord.record)) {
            message.error("No Record")
            return
        }
        let req = await mintPublic({
            tokenARecord: tokenARecord.record,
            tokenA: createData.tokenA,
            tokenBRecord: tokenBRecord.record,
            tokenB: createData.tokenB
        })
        req && message.success("合约正在执行");

    }

    return (<div>
        <Space
            direction={"vertical"}
            size={"large"}
            style={{width: "100%", marginTop: "8px"}}>
            <InputBgCardA
                inputChange={(value) => {
                    setCreateData({
                        ...createData,
                        tokenA: value
                    })
                }}
                inputValue={createData.tokenA}
                currentSelected={TOKENS[0]}
            />

            <InputBgCardA
                inputChange={(value) => {
                    setCreateData({
                        ...createData,
                        tokenB: value
                    })
                }}
                inputValue={createData.tokenB}
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
            onClick={confirmCreate}
        >{buttonText}</BwqButton>
    </div>)
}