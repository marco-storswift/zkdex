import {Input} from "antd";
import React from "react";
import {SizeType} from "antd/es/config-provider/SizeContext";

interface NumericInputProps {
    style?: React.CSSProperties;
    size?: SizeType
    className?: string
    value: string;
    placeholder: string
    addonAfter?: any
    bordered?: boolean
    onChange: (value: string) => void;
}

const NumericInput = (props: NumericInputProps) => {
    const {value, size, className, onChange, bordered, addonAfter} = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {value: inputValue} = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            onChange(inputValue);
        }
    };

    return (
        <Input
            {...props}
            size={size}
            style={{
                fontSize: "32px",
                color: "rgb(13, 17, 28)"
            }}
            className={className}
            onChange={handleChange}
            // onBlur={handleBlur}
            bordered={bordered}
            addonAfter={addonAfter}
            // maxLength={12}
        />
    );
};

export default NumericInput