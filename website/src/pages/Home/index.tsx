/** @format */

import React from 'react';
import CustomHeader from '../../components/customHeader';

import '../../style/card.css';
import SwapCard from './component/SwapCard';

const Home = () => {
    return (
        <CustomHeader>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignContent: 'center',
                    alignItems: 'center',
                }}>
                <SwapCard/>
            </div>
        </CustomHeader>
    );
};

export default Home;
