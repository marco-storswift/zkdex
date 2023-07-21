import {Card, Drawer, Space, Typography} from "antd";
import AccountTitle from "./accountTitle";
import React, {useEffect, useState} from "react";
import {useStore} from "../../context";
import NavLayout from "./navLayout";
import Meta from "antd/lib/card/Meta";
import {Records} from "../../model";
import RecordUtils from "../../utils/recordUtils";
import {PROGRAM_LATEST, TOKENS} from "../../constants";
import {useNavigate} from "react-router-dom";
import MintModal from "./MintModal";
import {getConfigMappingValueFromV1, getPublicToken, queryRecords} from "../../api";
import {BwqButton} from "../StyleComponents";
import BlockiesCard from "../BlockiesCard";


interface AccountDrawerProps {
    open: boolean
    onClose: () => void
}

export default function AccountDrawer(props: AccountDrawerProps) {
    const {open, onClose} = props
    const navigate = useNavigate()

    const [state, dispatch] = useStore();
    /**
     * 设置钱包地址
     */
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState(0);

    const [showMintModel, setShowMintModel] = useState(false)

    useEffect(() => {
        if (state) {
            setAddress(state.currentAddress);
            setBalance(state.balance);
            queryPublicToken(state.currentAddress)
            handleData(state.records)
        }
    }, [state])

    useEffect(()=>{
        if (showMintModel){
            refreshRecordsAndConfig()
        }
    },[showMintModel])

    async function refreshRecordsAndConfig() {
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
    }


    const [tokenABalance, setTokenABalance] = useState(0);
    const [tokenBBalance, setTokenBBalance] = useState(0);
    const [paBalance, setPABalance] = useState(0);
    const [pbBalance, setPBBalance] = useState(0);

    function handleData(records: Records[]) {
        let aB = RecordUtils.calculateTokenBalance(records, TOKENS[0].tokenValue)
        let bB = RecordUtils.calculateTokenBalance(records, TOKENS[1].tokenValue)
        setTokenABalance(aB)
        setTokenBBalance(bB)
    }

    async function queryPublicToken(address: string) {
        if (address) {
            let pa = await getPublicToken("account_a", address)
            let pb = await getPublicToken("account_b", address)
            setPABalance(pa ? pa.split("u")[0] : 0)
            setPBBalance(pb ? pb.split("u")[0]  : 0)
        } else {
            setPABalance(0)
            setPBBalance(0)
        }

    }

    function f() {

    }

    return (
        <Drawer
            mask={false}
            width={428}
            rootClassName={"aaa"}
            title={<AccountTitle close={onClose} address={address}/>}
            placement={"right"}
            closable={false}
            onClose={onClose}
            open={open}
        >
            <Typography className={"css-z2fexy"}>{`$${balance}`}</Typography>

            <Space direction={"vertical"} size={"small"}
                   style={{display: "flex", justifyContent: "space-between", marginTop: "24px"}}>
                <Card style={{marginTop: 16}} loading={false}>
                    <Meta
                        avatar={<BlockiesCard seed={TOKENS[0].icon}/>}
                        title={TOKENS[0].tokenValue}
                        description={<div>
                            <Space direction={"horizontal"} size={"small"} style={{display: "flex"}}>
                                <Typography style={{fontWeight: 600}}>{`Private:`}</Typography>
                                <Typography>{tokenABalance}</Typography>
                            </Space>
                            <Space direction={"horizontal"} size={"small"} style={{display: "flex"}}>
                                <Typography style={{fontWeight: 600}}>{`Public:`}</Typography>
                                <Typography >{paBalance}</Typography>
                            </Space>
                        </div>}
                    />
                </Card>
                <Card style={{marginTop: 16}} loading={false}>
                    <Meta
                        avatar={<BlockiesCard seed={TOKENS[1].icon}/>}
                        title={TOKENS[1].tokenValue}
                        description={<div>
                            <Space direction={"horizontal"} size={"small"} style={{display: "flex"}}>
                                <Typography style={{fontWeight: 600}}>{`Private:`}</Typography>
                                <Typography>{tokenBBalance}</Typography>
                            </Space>
                            <Space direction={"horizontal"} size={"small"} style={{display: "flex"}}>
                                <Typography style={{fontWeight: 600}}>{`Public:`}</Typography>
                                <Typography >{pbBalance}</Typography>
                            </Space>
                        </div>}
                    />
                </Card>
            </Space>

            <Space direction={"vertical"} size={"large"} style={{width: "100%", marginTop: "24px"}}>
                <BwqButton style={{
                    backgroundColor: address ? "rgba(251, 17, 142, 0.12)" : "rgb(245, 246, 252)",
                    color: address ? "rgb(251, 17, 142)" : "rgb(119, 128, 160)",
                    height:"48px"
                }} disabled={address ? false : true}
                           onClick={() => {
                               setShowMintModel(true)
                           }}
                >Mint Tokens</BwqButton>
            </Space>

            <NavLayout/>
            <MintModal address={address} onClose={() => {
                setShowMintModel(false)
            }} open={showMintModel}/>

        </Drawer>)
}