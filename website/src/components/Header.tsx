/** @format */

import {Link, useNavigate} from 'react-router-dom';
import {useEffect, useState} from 'react';
import styled from 'styled-components';
import CustomButton from "./customButton";
import {connectWalletPlugin, getConfigMappingValueFromV1, queryRecords, walletAccount, walletConnected} from "../api";

import {useStore} from '../context'
import WalletUtils from "../utils/walletUtils";
import WalletDropDowm from "./WalletDropDowm";
import {PROGRAM_LATEST} from "../constants";
import AccountDrawer from "./AccountDrawer";

const Wrapper = styled.div`
  position: fixed;
  z-index: 10;
  height: 1.75rem;
  width: 100%;
  padding: 2.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  top: 0;
  color: white;
  font-weight: 900;
  background: transparent;
  /* display: grid; */
  /* border: 1px solid green; */
  /* gap: 10px;
   justify-content: space-between;
   grid-template-columns: 1fr 1fr 1fr; */
  @media (max-width: 500px) {
    width: 113%;
    background: #131a2a;
    display: flex;
    margin-left: -12vw;
    justify-content: space-between;
    .search {
      display: none !important;
    }

    .logo {
      display: none !important;
    }
  }
`;

// @ts-ignore
const SWAP_Link = styled(Link)`
  transition: all 300ms;
  margin: 0.75rem;
  font-size: 1rem;

  &:hover {
    transition: all 300ms;
    background: linear-gradient(96deg, rgba(243, 110, 236, 1) 0%, rgba(207, 126, 236, 1) 53%, rgba(211, 210, 224, 1) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: hue 3s linear infinite;
  }

  @keyframes hue {
    0% {
      filter: hue-rotate(0deg);
    }
    100% {
      filter: hue-rotate(360deg);
    }
  }
`;
const NFT_Wallet = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Header = () => {
    const navigator = useNavigate();
    const [state, dispatch] = useStore();
    /**
     * 设置钱包地址
     */
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState(0);

    useEffect(() => {
        if (state) {
            setAddress(state.currentAddress);
            setBalance(state.balance);
        }
    }, [state])

    async function connectWallet() {
        if (!WalletUtils.hasWallet()) {
            return false
        }
        let isConnect = walletConnected()
        dispatch({type: "walletConnected", value: isConnect})
        if (isConnect) {
            console.log("setAddressData")
            setAddressData()
            return true
        }
        await connectWalletPlugin()
        if (await walletConnected()) {
            dispatch({type: "walletConnected", value: true})
            setAddressData();
            return true
        } else {
            dispatch({type: "currentAddress", value: ""})
            return false
        }
    }


    async function setAddressData() {
        let account = await walletAccount()
        if (account && account.address) {
            setRecords()
            setConfig()
            dispatch({type: "currentAddress", value: account.address})
        }
        if (account && account.balance) {
            dispatch({type: "balance", value: account.balance});
        }
    }

    async function setRecords() {
        let response = await queryRecords({program: PROGRAM_LATEST})
        if (response && response.length) {
            dispatch({type: "records", value: response})
        } else {
            dispatch({type: "records", value: []})
        }
    }

    async function setConfig() {
        let config = await getConfigMappingValueFromV1()
        if (config) {
            dispatch({type: "mapConfig", value: config})
        } else {
            dispatch({type: "mapConfig", value: {}})
        }
    }

    const [showDrawer, setShowDrawer] = useState(false)


    useEffect(() => {
        if (showDrawer) {
            setRecords()
            setConfig()
        }
    }, [showDrawer])

    function showAccountDrawer() {
        setShowDrawer(true)
    }

    function hideAccountDrawer() {
        setShowDrawer(false)
    }

    return (
        <>
            {/* 判断显示器像素宽度大小，小于500时呈现移动端布局方案*/}
            <Wrapper>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                    }}>
                    <Link className="logo" onClick={() => {
                        navigator('/')
                    }} to={"/"} style={{margin: "0 2.5rem 0 0.75rem"}}>
                        <div style={{display: "flex", alignItems: "center"}}>
                            <img src={"/assets/aleo_logo.png"} style={{width: "24px"}}></img>
                        </div>
                    </Link>
                    <SWAP_Link
                        className='my-iconfont'
                        onClick={() => {
                            navigator('/');
                        }}
                        to={'/'}>
                        {'Swap'}
                    </SWAP_Link>
                    <SWAP_Link
                        className='my-iconfont'
                        onClick={() => {
                            navigator('/pools');
                        }}
                        to={'/pools'}>
                        {"Pools"}
                    </SWAP_Link>
                    {/*<SWAP_Link*/}
                    {/*    className='my-iconfont'*/}
                    {/*    onClick={() => {*/}
                    {/*        navigator('/account');*/}
                    {/*    }}*/}
                    {/*    to={'/account'}>*/}
                    {/*    {"Account"}*/}
                    {/*</SWAP_Link>*/}
                </div>

                <NFT_Wallet>
                    {
                        address ? <div style={{display: "flex", alignItems: "center"}}>
                                <WalletDropDowm text={address} onclick={showAccountDrawer}/></div> :
                            <CustomButton
                                buttonText={"Connect Wallet"}
                                onclick={() => {
                                    if (WalletUtils.hasWallet()) {
                                         connectWallet().then((connected)=>{
                                             if (connected){
                                                 showAccountDrawer()
                                             }
                                         })
                                    }
                                }}/>
                    }
                </NFT_Wallet>
                <AccountDrawer onClose={hideAccountDrawer} open={showDrawer}/>
            </Wrapper>
        </>
    );
};

export default Header;
