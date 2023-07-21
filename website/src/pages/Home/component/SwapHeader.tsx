import {ContentBox, SetupStyle} from "../../../components/StyleComponents";
import React from "react";
import {Space} from "antd";
import {Toggle} from 'rsuite';

interface SwapHeaderProps {
    currentSelected: boolean
    onChangeHeader: (checked: boolean) => void
}

export default function SwapHeader(props: SwapHeaderProps) {
    const {currentSelected, onChangeHeader} = props
    return (
        <SetupStyle>
            <Space direction={"horizontal"} size={"large"} style={{display: "flex"}}>
                <ContentBox>{"Swap"}</ContentBox>
            </Space>
            <Space direction={"horizontal"} size={"small"} style={{display: "flex"}}>
                <Toggle size={"lg"} checked={currentSelected} checkedChildren="Public" unCheckedChildren="Private"
                        onChange={(checked) => {
                            onChangeHeader(checked)
                        }}/>
            </Space>

        </SetupStyle>)
}