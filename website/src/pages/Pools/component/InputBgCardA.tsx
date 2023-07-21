import {Crmdiv, InputDiv, TokenButton, TokenDiv, TokenSpan, TokenText} from "../../../components/StyleComponents";
import React from "react";
import NumericInput from "../../../components/NumericInput";
import {TokenType} from "../../../model";
import CustomInput from "../../../components/CustomInput";
import BlockiesCard from "../../../components/BlockiesCard";


interface InputBgCardProps {
    inputValue: string,
    inputChange: (value: string) => void
    currentSelected: TokenType,
    normalInput?: boolean
}


export default function InputBgCardA(props: InputBgCardProps) {
    const {inputValue, normalInput, inputChange, currentSelected} = props
    return (<InputDiv>
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
            width: "100%"
        }}>
            {
                normalInput ?
                    <CustomInput
                        value={inputValue}
                        placeholder={""}
                        bordered={false}
                        onChange={inputChange}/> :
                    <NumericInput
                        size={"large"}
                        placeholder="0"
                        bordered={false}
                        onChange={inputChange} value={inputValue}/>
            }

            {
                normalInput ? null : <TokenButton>
                    <TokenSpan>
                        <TokenDiv>
                            <Crmdiv>
                                <BlockiesCard seed={currentSelected.icon}/>
                            </Crmdiv>
                            <TokenText>{currentSelected.tokenValue}</TokenText>
                            <svg width='12' height='7' viewBox='0 0 12 7' fill='none' xmlns='http://www.w3.org/2000/svg'
                                 className='sc-3zewi2-8 MZuqQ'>
                                <path d='M0.97168 1L6.20532 6L11.439 1' stroke='#AEAEAE'></path>
                            </svg>
                        </TokenDiv>
                    </TokenSpan>
                </TokenButton>
            }

        </div>
    </InputDiv>)
}