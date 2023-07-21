
import React, {useEffect, useState} from "react";
import {useStore} from "../../context";
import {MapConfig, Records} from "../../model";
import {getAccountMappingValue, getConfigMappingValueFromV1} from "../../api";
import PoolsCard from "./component/poolsCard";
import CustomHeader from "../../components/customHeader";


export default function Pools() {
    const [state, dispatch] = useStore();
    /**
     * 设置钱包地址
     */
    const [address, setAddress] = useState("");
    const [records, setRecords] = useState([] as Records[]);
    const [configData, setConfigData] = useState({} as MapConfig)

    const [isLoading, setLoading] = useState(false)

    /**
     * 是否显示提取按钮
     */
    const [showExtract, setShowExtract] = useState(false)
    const [data, setData] = useState({
        currentBalance: "0",
        allBalance: "0"
    })

    useEffect(() => {
        queryConfigData()
    }, [])


    useEffect(() => {
        if (address) {
            queryHasAccount(address)
        }
    }, [address])

    async function queryHasAccount(address: string) {
        let req = await getAccountMappingValue(address)
        if (req) {
            let configData = await getConfigMappingValueFromV1()
            setData({
                currentBalance: req.split("u")[0],
                allBalance: configData.total_supply
            })
            setShowExtract(true)
        } else {
            setShowExtract(false)
        }
        setLoading(false)
    }

    useEffect(() => {
        if (configData && configData.total_supply) {
            setData({
                ...data,
                allBalance: configData.total_supply
            })
            setLoading(false)
        }
    }, [configData])


    /**
     * 查询config对象
     */
    async function queryConfigData() {
        setLoading(true)
        let config = await getConfigMappingValueFromV1()
        if (config && config.total_supply) {
            setConfigData(config)
            dispatch({type: "mapConfig", value: config})
        } else {
            setConfigData({} as MapConfig)
        }
        setLoading(false)
    }


    useEffect(() => {
        if (state) {
            setAddress(state.currentAddress);
            setRecords(state.records)
        }
    }, [state])


    return (<CustomHeader>
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center',
                alignItems: 'center',
                width: "100%",
            }}>
            <div style={{
                width: "100%",
                maxWidth: "870px",
                marginTop: "80px"
            }}>
                <PoolsCard/>
            </div>

        </div>
    </CustomHeader>)
}