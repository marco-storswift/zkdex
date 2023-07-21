/** @format */

import React from 'react';
import {List, Modal, Typography} from 'antd';
import {Kondiv, Selectdiv, SelectInput, Tagdiv, Tagdiv1, TokenTag} from '../../../components/StyleComponents';
import './cardinput.css';
import {TOKENS} from "../../../constants";
import {TokenType} from "../../../model";
import BlockiesCard from "../../../components/BlockiesCard";

interface Props {
    currentSelected: TokenType
    isModalOpen: boolean;
    handleCancel: (selected: TokenType) => void;
}

function ModalComponent(props: Props) {
    const {isModalOpen, currentSelected, handleCancel} = props;
    const tokenElements = TOKENS.map((token, index) => (
        <TokenTag
            key={index}
            className={currentSelected.tokenKey === token.tokenKey ? "xipXhod" : ""}
            onClick={() => selectedTokenType(token)}>
            <div style={{display: "flex", alignContent: "center", marginRight: "2px"}}>
                <BlockiesCard seed={token.icon} size={6}/>
            </div>
            {` `} {token.tokenValue}
        </TokenTag>
    ));

    function selectedTokenType(token: TokenType) {
        handleCancel(token)
    }

    return (
        <Modal title='Select a token' footer={null} open={isModalOpen} onCancel={() => handleCancel({} as TokenType)}>
            <div style={{display: 'grid', gridAutoRows: 'auto', rowGap: '16px'}}>
                <Selectdiv>
                    <SelectInput placeholder='Search name or paste address'/>
                </Selectdiv>
                <Tagdiv>
                    <Tagdiv1>{tokenElements}</Tagdiv1>
                </Tagdiv>
                <Kondiv/>
                <List
                    itemLayout="horizontal"
                    dataSource={TOKENS}
                    renderItem={(item, index) => (
                        <List.Item key={index} style={{cursor: "pointer"}} onClick={() => {
                            selectedTokenType(item)
                        }}>
                            <List.Item.Meta
                                avatar={<BlockiesCard seed={item.icon}/>}
                                title={<Typography>{item.tokenValue}</Typography>}
                                description={item.tokenKey}
                            />
                        </List.Item>
                    )}
                />
            </div>
        </Modal>
    );
}

export default ModalComponent;
