import {Button, Card, Space, Typography} from "antd";
import {useEffect, useState} from "react";
import {getAccountMappingValue, getConfigMappingValueFromV1} from "../../../api";
import {useStore} from "../../../context";
import {TOKENS} from "../../../constants";
import BlockiesCard from "../../../components/BlockiesCard";

interface PositionListProps {
    address: string
    balanceData: {
        currentBalance: string,
        allBalance: string
    }
    onClickType: (type: "add" | "extract") => void
}

export default function PositionList(props: PositionListProps) {
    const {address, balanceData, onClickType} = props
    const [state, dispatch] = useStore();
    console.log(balanceData)
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
    const [showExtract, setShowExtract] = useState(false)
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        queryHasAccount()
    }, [address])

    useEffect(() => {
        if (state && state.addresses) {
            queryHasAccount()
        }
    }, [state])

    async function queryHasAccount() {
        if (!address) {
            return
        }
        setLoading(true)
        let req = await getAccountMappingValue(address)
        if (req) {
            let configData = await getConfigMappingValueFromV1()
            setCBalance({
                currentBalance: req.split("u")[0],
                allBalance: configData.total_supply
            })
            setShowExtract(true)
        } else {
            setShowExtract(false)
        }
        setLoading(false)
    }

    return (
        <Card style={{width: "387px", margin: "24px", backgroundColor: "rgb(245, 246, 252)"}} loading={loading}>
            <div style={{
                display: "flex",
                justifyContent: "center",
                padding: "0 16px",
                alignContent: "center",
                alignItems: "center"
            }}>
                <div style={{
                    display: 'flex',
                    justifyContent: "space-between",
                    alignContent: "center",
                    alignItems: "center",
                    width: "60%"
                }}>
                    <div style={{textAlign: "center"}}>
                        <div>
                            <BlockiesCard seed={TOKENS[0].icon} size={14}/>
                        </div>
                        <Typography style={{fontSize: "20px", fontWeight: 600}}>{TOKENS[0].tokenValue}</Typography>
                    </div>
                    <div style={{textAlign: "center"}}>
                        <div>
                            <BlockiesCard seed={TOKENS[1].icon} size={14}/>
                        </div>
                        <Typography style={{fontSize: "20px", fontWeight: 600}}>{TOKENS[1].tokenValue}</Typography>
                    </div>
                </div>
            </div>
            <Space direction={"horizontal"} size={"small"} style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "8px",
                padding: "0 16px",
                alignContent: "center",
                alignItems: "center"
            }}>
                <Typography style={{fontSize: "16px", fontWeight: 600}}>liquidity:</Typography>
                <Typography
                    style={{color: "red", fontSize: "16px", fontWeight: 600}}>{cBalance.currentBalance}</Typography>
                <Typography style={{fontSize: "16px", fontWeight: 600}}>/</Typography>
                <Typography style={{fontSize: "16px", fontWeight: 600}}>{cBalance.allBalance}</Typography>
            </Space>
            <div style={{
                display: "flex",
                justifyContent: "center",
                padding: "0 16px",
                alignContent: "center",
                alignItems: "center"
            }}>
                <div
                    style={{
                        display: "flex",
                        marginTop: "24px",
                        justifyContent: showExtract && address ? "space-between" : "center",
                        alignContent: "center",
                        alignItems: "center",
                        width: "60%",
                    }}>
                    {showExtract && address ?
                        <Button
                            type="primary"
                            danger onClick={() => {
                            onClickType("extract")
                        }}>{"Withdraw"}</Button> : null}
                    <Button
                        type="primary"
                        disabled={address ? false : true}
                        danger onClick={() => {
                        onClickType("add")
                    }}>{"Add"}</Button>
                </div>
            </div>

        </Card>)
}