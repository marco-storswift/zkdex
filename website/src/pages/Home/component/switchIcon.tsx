import styled from "styled-components";
import React from "react";


export const ArrowStyle = styled.div`
  border-radius: 12px;
  height: 40px;
  width: 40px;
  position: relative;
  margin: -18px auto;
  background-color: rgb(232, 236, 251);
  border: 4px solid rgb(255, 255, 255);
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ArrowSvg = (
    <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        viewBox='0 0 24 24'
        fill='none'
        stroke='#0D111C'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'>
        <line x1='12' y1='5' x2='12' y2='19'></line>
        <polyline points='19 12 12 19 5 12'></polyline>
    </svg>)

interface SwitchIconProps {
    onSwitch: () => void
}

export default function SwitchIcon(props: SwitchIconProps) {
    return (<ArrowStyle style={{cursor: "pointer"}} onClick={props.onSwitch}>{ArrowSvg}</ArrowStyle>)
}