import {Crmdiv, InputDiv, InputStyle, TokenButton, TokenDiv, TokenImg, TokenSpan, TokenText} from "../../../components/StyleComponents";
import React, {useState} from "react";
import NumericInput from "../../../components/NumericInput";
import {TokenType} from "../../../model";
import ModalComponent from "./ModalComponent";
import BlockiesCard from "../../../components/BlockiesCard";


interface InputBgCardProps {
    inputValue: string,
    inputChange: (value: string) => void
    currentSelected: TokenType,
    selectedChange: (selected: TokenType) => void
}


export default function InputBgCard(props: InputBgCardProps) {
    const {inputValue, inputChange, currentSelected, selectedChange} = props
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };
    return (<InputDiv>
        <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center",
            alignItems: "center",
            width: "100%"
        }}>
            <NumericInput
                size={"large"}
                placeholder="0"
                bordered={false}
                onChange={inputChange} value={inputValue}/>
            <TokenButton onClick={showModal}>
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
        </div>
        <ModalComponent
            currentSelected={currentSelected}
            isModalOpen={isModalOpen}
            handleCancel={(selected) => {
                if (selected.id) {
                    selectedChange(selected)
                }
                handleCancel()
            }}/>
    </InputDiv>)
}