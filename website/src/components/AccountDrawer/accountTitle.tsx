import {message, Space} from "antd";
import "./drawer.css"
import {CopyToClipboard} from "react-copy-to-clipboard";
import {cancelPre, walletDisConnect} from "../../api";
import {useStore} from "../../context";

interface AccountTitleProps {
    address: string
    close: () => void
}

export default function AccountTitle(props: AccountTitleProps) {
    const {address, close} = props
    const [state, dispatch] = useStore();

    async function disConnect() {
        dispatch({type: "walletConnected", value: false});
        dispatch({type: "currentAddress", value: ""});
        const res = await cancelPre();
        if (res) {
            await walletDisConnect();
        }
        close()
    }


    function getAleoAddress() {
        if (address) {
            return address.substring(0, 5) + "..." + address.substring(address.length - 4)
        }
        return ""
    }

    return (<div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    }}>

        <Space
            direction={"horizontal"}
            size={"small"}
            style={{display: "flex", justifyContent: "center", alignItems: "center", alignContent: "center"}}>
            <img src={"/assets/close.svg"} style={{width: "24px", cursor: "pointer",marginRight:"16px"}} onClick={() => close()}/>
            <img src={"/assets/aleo_logo.png"} style={{width: "24px", marginRight: "16px"}}/>
            <CopyToClipboard text={address} onCopy={() => {
                message.success("Copied! ")
            }}>
                <Space
                    direction={"horizontal"} size={"small"} className={"accountTitle"}
                    style={{cursor: "pointer"}}>
                    <span>{getAleoAddress()}</span>
                    <img src={"/assets/copy.svg"} style={{width: "16px"}}/>
                </Space>
            </CopyToClipboard>
        </Space>

        <div style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgb(232, 236, 251)",
            borderRadius: "16px",
            cursor: "pointer"
        }} onClick={async () => {
            disConnect()
        }}>
            <img src={"/assets/disconnect.svg"} style={{width: "32px"}}></img>
        </div>

    </div>)
}