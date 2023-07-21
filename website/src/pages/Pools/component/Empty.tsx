import {Empty} from "antd";

export default function EmptyPage() {
    return (<Empty
        image={Empty.PRESENTED_IMAGE_SIMPLE}
        imageStyle={{height: 80}}
        description={"Your active V5 liquidity positions will appear here."}
    >
    </Empty>)
}