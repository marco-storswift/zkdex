import {message, Modal, Space, Typography} from "antd";
import React, {useEffect, useState} from "react";
import InputBgCardA from "../../pages/Pools/component/InputBgCardA";
import {PROGRAM_LATEST, TOKENS} from "../../constants";
import {BwqButton} from "../StyleComponents";
import InputBgCard from "../../pages/Home/component/InputBgCard";
import {execute} from "../../api";
import {Toggle} from "rsuite";

interface MintModalProps {
    address: string
    open: boolean
    onClose: () => void
}

export default function MintModal(props: MintModalProps) {
    const {address, open, onClose} = props
    const [mintData, setMintData] = useState({
        mintAmount: "",
        mintType: TOKENS[0],
        address: ""
    })
    useEffect(()=>{
        setMintData({
            mintAmount: "",
            mintType: TOKENS[0],
            address: address
        })
    },[address])

    async function confirmMintToken() {
        if (!mintData.address) {
            message.error("Please enter address~")
            return
        }
        let executeData = {
            programID: PROGRAM_LATEST,
            functionName: selected ? mintData.mintType.publicTokenKey : mintData.mintType.tokenKey,
            inputs: `${mintData.address}&&${mintData.mintAmount}u64`
        }
        let data = await execute(executeData);
        data && message.success("合约正在执行");
    }

    const [selected, setSelected] = useState(false)
    return (<Modal
        title={<div
            style={{
                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                alignItems: "center",
                marginRight: "24px"
            }}>
            <Typography style={{fontSize: "24px", fontWeight: 600}}>{"Mint Token"}</Typography>
            <Toggle size={"lg"} checked={selected} checkedChildren="Public" unCheckedChildren="Private"
                    onChange={(checked) => {
                        setSelected(checked)
                    }}/>
        </div>}
        centered
        open={open}
        onCancel={() => onClose()}
        footer={null}>
        <div>
            <Space
                direction={"vertical"}
                size={"large"}
                style={{width: "100%", marginTop: "8px"}}>
                <InputBgCard
                    inputChange={(value) => {
                        if (Number(value) <= 1000) {
                            setMintData({
                                ...mintData,
                                mintAmount: value
                            })
                        } else {
                            message.warning("The maximum cannot exceed 1000!")
                            setMintData({
                                ...mintData,
                                mintAmount: "1000"
                            })
                        }

                    }}
                    inputValue={mintData.mintAmount}
                    currentSelected={mintData.mintType}
                    selectedChange={(selected) => {
                        setMintData({
                            ...mintData,
                            mintType: selected
                        })
                    }}
                />
                <InputBgCardA
                    normalInput
                    inputChange={(value) => {
                        setMintData({
                            ...mintData,
                            address: value
                        })
                    }}
                    inputValue={mintData.address}
                    currentSelected={TOKENS[1]}
                />
            </Space>


            <BwqButton
                style={{
                    backgroundColor: address ? "rgba(251, 17, 142, 0.12)" : "rgb(245, 246, 252)",
                    color: address ? "rgb(251, 17, 142)" : "rgb(119, 128, 160)"
                }}
                disabled={address ? false : true}
                onClick={confirmMintToken}
            >Mint Token</BwqButton>
        </div>

    </Modal>)
}