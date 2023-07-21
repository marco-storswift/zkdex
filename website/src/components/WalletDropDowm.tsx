import CustomButton from "./customButton";
import {MenuProps, message, Typography} from "antd";
import React, {useEffect, useState} from "react";
import {CopyToClipboard} from "react-copy-to-clipboard";
import {useStore} from "../context";
import {cancelPre, walletDisConnect} from "../api";

interface WalletDropDowmProps {
    text: string;
    onclick: () => void
}

export default function WalletDropDowm(props: WalletDropDowmProps) {
    const {text,onclick} = props;
    const [messageApi, contextHolder] = message.useMessage();
    const [copyData, setCopyData] = useState({
        value: "",
        copied: false,
    });

    const [state, dispatch] = useStore();

    useEffect(() => {
        if (copyData && copyData.copied) {
            success();
        }
    }, [copyData]);
    const items: MenuProps["items"] = [
        {
            label: (
                <CopyToClipboard
                    text={text}
                    onCopy={() => {
                        setCopyData({
                            value: text,
                            copied: true,
                        });
                    }}>
                    <Typography
                        style={{
                            cursor: "pointer",
                            textAlign: "center",
                            fontSize: "18px",
                            fontWeight: 500,
                        }}>
                        {"Copy Address"}
                    </Typography>
                </CopyToClipboard>
            ),
            key: "0",
        },
        {
            label: (
                <Typography
                    style={{
                        cursor: "pointer",
                        textAlign: "center",
                        fontSize: "18px",
                        fontWeight: 500,
                    }}
                    onClick={disConnect}>
                    {"Disconnect"}
                </Typography>
            ),
            key: "1",
        },
    ];

    const success = () => {
        messageApi.open({
            type: "success",
            content: "Copied! ",
        });
    };

    async function disConnect() {
        dispatch({type: "walletConnected", value: false});
        dispatch({type: "currentAddress", value: ""});
        const res = await cancelPre();
        if (res) {
            await walletDisConnect();
        }
        res && message.success("Disconnected!");
    }

    return (
        <div>
            {contextHolder}
            <CustomButton showImage={text != ""} buttonText={text ? text : "Connect Wallet"} onclick={onclick}/>
        </div>
    );
}
