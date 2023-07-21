import {Avatar, List, message, Tooltip, Typography} from "antd";
import {useStore} from "../../context";
import {useEffect, useState} from "react";
import {Records} from "../../model";
import RecordUtils from "../../utils/recordUtils";

import {CopyToClipboard} from "react-copy-to-clipboard";
import {TOKENS} from "../../constants";
import BlockiesCard from "../BlockiesCard";

interface ListItems {
    icon: string
    title: string
    amount: string
    record: string
}

export default function TokensListPage() {
    const [state, dispatch] = useStore();
    const [listData, setListData] = useState([] as ListItems[])
    const [isLoading, setLoading] = useState(false)
    useEffect(() => {
        console.log(state)
        if (state) {
            handleData(state.records)
        }
    }, [state])

    function handleData(records: Records[]) {
        setLoading(true)
        let list = [] as ListItems[]
        records && records.forEach((item) => {
            let amount = RecordUtils.analyzeCredits(item.record).toString()
            if (Number(amount) > 0) {
                list.push({
                    icon: "",
                    title: item.identifier,
                    amount: amount,
                    record: item.record
                })
            }
        })
        setListData(list)
        setLoading(false)
    }

    return (<div>
        <List
            loading={isLoading}
            itemLayout="horizontal"
            dataSource={listData}
            renderItem={(item, index) => (
                <List.Item actions={[
                    <CopyToClipboard text={item.record} onCopy={() => {
                        message.success("Copied!")
                    }}>
                        <Tooltip title={item.record}>
                            <img src={"/assets/copy.svg"} style={{width: "16px", cursor: "pointer"}}/>
                        </Tooltip>
                    </CopyToClipboard>
                ]}>
                    <List.Item.Meta
                        avatar={<BlockiesCard seed={item.title === TOKENS[0].tokenValue ? TOKENS[0].icon : TOKENS[1].icon}/>}
                        title={<Typography>{item.title}</Typography>}
                        description={item.amount}
                    />
                </List.Item>
            )}
        />

    </div>)
}