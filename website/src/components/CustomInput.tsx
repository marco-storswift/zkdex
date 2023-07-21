import React from "react";
import {SizeType} from "antd/es/config-provider/SizeContext";
import {Input} from "antd";

const {TextArea} = Input;

interface CustomInputInputProps {
    style?: React.CSSProperties;
    size?: SizeType
    className?: string
    value: string;
    placeholder: string
    addonAfter?: any
    bordered?: boolean
    onChange: (value: string) => void;
}

const CustomInput = (props: CustomInputInputProps) => {
    const {size, className, onChange, bordered, addonAfter} = props;
    return (
        <TextArea
            {...props}
            size={size}
            style={{
                fontSize: "16px",
                color: "rgb(13, 17, 28)"
            }}
            autoSize={{minRows: 1, maxRows: 2}}
            className={className}
            onChange={(event) => {
                onChange(event.target.value);
            }}
            maxLength={100}
            bordered={bordered}
        />
    );
};
export default CustomInput