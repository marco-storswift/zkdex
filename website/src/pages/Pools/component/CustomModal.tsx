import {Modal, Typography} from "antd";
import React, {useEffect, useState} from "react";
import CreatePosition from "./createPosition";
import {MapConfig, Records} from "../../../model";
import {getAccountMappingValue, getConfigMappingValueFromV1} from "../../../api";
import ExtractPosition from "./extractPosition";

interface CustomModalProps {
    address: string
    records: Records[]
    configData: MapConfig
    balanceData: {
        currentBalance: string,
        allBalance: string
    }
    open: boolean,
    title: string,
    type: "create" | "add" | "extract",
    onClose: () => void
}

export default function CustomModal(props: CustomModalProps) {
    const {title, address, configData, records, open, type, balanceData, onClose} = props
    const [cBalance, setCBalance] = useState({
        currentBalance: "0",
        allBalance: "0"
    })
    useEffect(() => {
        if (balanceData) {
            setCBalance({
                currentBalance: balanceData.currentBalance,
                allBalance: balanceData.allBalance
            })
        }
    }, [balanceData])

    useEffect(() => {
        if (address) {
            queryHasAccount()
        }
    }, [address])

    async function queryHasAccount() {
        if (!address) {
            return
        }
        let req = await getAccountMappingValue(address)
        if (req) {
            let configData = await getConfigMappingValueFromV1()
            setCBalance({
                currentBalance: req.split("u")[0],
                allBalance: configData.total_supply
            })
        } else {
        }
    }

    return (
        <Modal
            width={"100%"}
            style={{maxWidth: "870px"}}
            title={<Typography style={{fontSize: "24px", fontWeight: 600}}>{title}</Typography>}
            centered
            open={open}
            onCancel={() => onClose()}
            footer={null}>
            {
                type === "create" || type === "add" ?
                    <CreatePosition
                        open={open}
                        configData={configData}
                        cBalance={cBalance}
                        records={records}
                        buttonText={type === "create" ? "Add Liquidity" : "Add"}
                        address={address}/> :
                    <ExtractPosition
                        open={open}
                        address={address}
                        cBalance={cBalance}
                        records={records}
                        configData={configData}/>
            }

        </Modal>
    )
}