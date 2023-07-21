import {Spin} from "antd";
import "./loading.css"
export default function LoadingPage() {
    return ( <Spin tip="Loading" size="large">
        <div className="content" />
    </Spin>)
}