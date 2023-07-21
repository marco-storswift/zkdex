/** @format */

import styled from 'styled-components';

export const DivStyle = styled.div`
   position: relative;
   background: rgb(255, 255, 255);
   border-radius: 16px;
   border: 1px solid rgb(210, 217, 238);
   padding: 12px 8px 8px;
   z-index: 1;
   transition: transform 250ms ease 0s;
   width: 29.375rem;
`;

export const SetupStyle = styled.div`
   -webkit-box-pack: justify;
   justify-content: space-between;
   width: 100%;
   display: flex;
   padding: 0px;
   -webkit-box-align: center;
   align-items: center;
   padding: 0.5rem 0.5rem;
`;

export const ContentBox = styled.div`
   font-size: 1.2rem;
  &::before {
    color: #646cff;
  }
`;

export const InputDiv = styled.div`
   position: relative;
   background-color: rgb(245, 246, 252);
   border-radius: 12px;
   padding: 16px;
   color: rgb(119, 128, 160);
   font-size: 14px;
   line-height: 20px;
   font-weight: 500;
   height: 6.25rem;
   display: flex;
   width: 100%;
   align-items: center;
   &::before {
      box-sizing: border-box;
      background-size: 100%;
      border-radius: inherit;
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      pointer-events: none;
      content: '';
      border: 1px solid rgb(245, 246, 252);
   }
`;

export const SwapCurrencyInput = styled.div`
   position: relative;
   border-radius: 20px;
   z-index: 1;
   //width: initial;
   //transition: height 1s ease 0s;
   //will-change: height;
`;

export const KbjDivInput = styled.div`
   min-height: 44px;
   border-radius: 20px;
   width: initial;
`;

export const EitDivInput = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  align-content: center;
  justify-content: space-between;
`;

export const InputStyle = styled.input`
   filter: none;
   opacity: 1;
   transition: opacity 0.2s ease-in-out 0s;
   text-align: left;
   font-size: 36px;
   line-height: 10px;
   font-variant: small-caps;
   color: rgb(13, 17, 28);
   font-weight: 400;
   outline: none;
   border: none;
   background-color: transparent;
   font-size: 28px;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   appearance: textfield;
`;

export const BwqButton = styled.button`
   background-color: rgba(251, 17, 142, 0.12);
   color: rgb(251, 17, 142);
   font-size: 20px;
   font-weight: 600;
   padding: 16px;
   width: 100%;
   text-align: center;
   border-radius: 20px;
   outline: none;
   border: 1px solid transparent;
   text-decoration: none;
   display: flex;
   -webkit-box-pack: center;
   justify-content: center;
   flex-wrap: nowrap;
   -webkit-box-align: center;
   align-items: center;
   cursor: pointer;
   position: relative;
   z-index: 1;
   will-change: transform;
   transition: transform 450ms ease 0s;
   transform: perspective(1px) translateZ(0px);
   margin-top: 0.4rem;
`;

export const TokenButton = styled.div` 
   background-color: rgb(232, 236, 251);
   opacity: 1;
   box-shadow: none;
   color: rgb(13, 17, 28);
   cursor: pointer;
   border-radius: 16px;
   outline: none;
   user-select: none;
   border: none;
   font-size: 24px;
   font-weight: 400;
   padding: 4px 8px 4px 4px;
   visibility: visible;
   top: 0;
`;

export const TokenSpan = styled.span`
   display: flex;
   -webkit-box-align: center;
   align-items: center;
   -webkit-box-pack: justify;
   justify-content: space-between;
   width: 100%;
`;

export const TokenDiv = styled.div`
   width: fit-content;
   display: flex;
   align-items: center;
`;

export const Crmdiv = styled.div`
   position: relative;
   display: flex;
   margin-right: 2px;
`;

export const TokenImg = styled.img`
   width: 24px;
   height: 24px;
   border-radius: 50%;
   background: radial-gradient(white 60%, rgba(255, 255, 255, 0) calc(70% + 1px));
   box-shadow: white 0px 0px 1px;
`;

export const TokenText = styled.span`
   margin: 0px 0.25rem;
   font-size: 20px;
   font-weight: 600;
`;

export const IconSetup = styled.div`
   width: fit-content;
`;
export const IconSetupDiv = styled.div`
   position: relative;
`;

export const IconSetupButton = styled.button`
   border: none;
   background-color: transparent;
   margin: 0px;
   padding: 0px;
   cursor: pointer;
   outline: none;
   opacity: 0.7;
`;

export const IconSetupJt = styled.div`
   padding: 6px 12px;
   border-radius: 16px;
`;

export const MediumSetup = styled.div`
   min-width: 20.125rem;
   background-color: rgb(255, 255, 255);
   border: 1px solid rgb(210, 217, 238);
   box-shadow: rgba(0, 0, 0, 0.01) 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 4px 8px, rgba(0, 0, 0, 0.04) 0px 16px 24px, rgba(0, 0, 0, 0.01) 0px 24px 32px;
   border-radius: 12px;
   position: absolute;
   top: 100%;
   margin-top: 10px;
   right: 0px;
   z-index: 100;
   color: rgb(13, 17, 28);
   user-select: none;
   padding: 16px;
`;

export const MediumDiv = styled.div`
   display: grid;
   grid-auto-rows: auto;
   row-gap: 16px;
`;

export const MediumDivhJYFVB = styled.div`
   -webkit-box-pack: justify;
   justify-content: space-between;
   width: 100%;
   display: flex;
   padding: 0px;
   -webkit-box-align: center;
   align-items: center;
   -webkit-box-pack: start;
   justify-content: flex-start;
   gap: 8px;
`;

export const MediumDivSons = styled.div`
   width: fit-content;
   width: 100%;
   display: flex;
   padding: 0px;
   -webkit-box-align: center;
   align-items: center;
   -webkit-box-pack: start;
   justify-content: flex-start;
`;

export const MediumDivE = styled.div`
   display: flex;
   flex-direction: column;
   -webkit-box-pack: start;
   justify-content: flex-start;
   gap: 4px;
`;

export const MediumDivEText = styled.div`
   box-sizing: border-box;
   margin: 0px;
   min-width: 0px;
   font-weight: 400;
   font-size: 16px;
`;

export const MediumDivButtons = styled.button`
   -webkit-box-align: center;
   align-items: center;
   background: transparent;
   border: 1px solid rgb(210, 217, 238);
   border-radius: 20px;
   cursor: pointer;
   display: flex;
   outline: none;
   padding: 4px;
   width: fit-content;
`;

export const MediumDivTo = styled.div`
   overflow: hidden;
   width: 100%;
   will-change: height;
`;

export const MaxSliDiv = styled.div`
   overflow: hidden;
   width: 100%;
   will-change: height;
`;

export const MinSliDivMid = styled.div`
   display: grid;
   grid-auto-rows: auto;
   gap: 16px;
   padding-top: 16px;
`;

export const MaxLine = styled.div`
   width: 100%;
   height: 1px;
   border-width: 0px;
   margin: 0px;
   background-color: rgb(210, 217, 238);
`;

export const MaxIcx = styled.div`
   display: flex;
   -webkit-box-pack: start;
   justify-content: space-between;
`;

export const OptionDiv = styled.div`
   cursor: pointer;
   -webkit-box-pack: end;
   justify-content: flex-end;
   width: unset;
   display: flex;
   padding: 0px;
   -webkit-box-align: center;
   align-items: center;
   -webkit-box-pack: start;
   justify-content: flex-start;
   box-sizing: border-box;
   margin: 0px;
   min-width: 0px;
`;

export const RiaDiv = styled.div`
   padding-top: 12px;
   display: flex;
   flex-direction: column;
   -webkit-box-pack: start;
   justify-content: flex-start;
   gap: 12px;
`;

export const RiaDiv2 = styled.div`
   -webkit-box-pack: justify;
   justify-content: space-between;
   display: flex;
`;

export const RiaDiv3 = styled.div`
   width: auto;
   padding: 4px;
   border: 1px solid rgb(210, 217, 238);
   border-radius: 16px;
   display: flex;
`;

export const RiaDiv4 = styled.div`
   padding: 0px 1rem;
   border-radius: 12px;
   flex: 1 1 0%;
   border: 1px solid rgb(210, 217, 238);
   display: flex;
   align-items: center;
   margin-left: 1rem;
`;

export const RiaDiv5 = styled.div`
   width: 100%;
   display: flex;
   padding: 0px 1rem;
   -webkit-box-align: center;
   align-items: center;
   -webkit-box-pack: start;
   justify-content: flex-start;
   border: 1px solid rgb(210, 217, 238);
   border-radius: 12px;
   height: 3rem;
   align-items: center;
`;

export const RiaDivInput = styled.input`
   width: 100%;
   display: flex;
   font-size: 16px;
   border: 0px;
   outline: none;
   background: transparent;
   text-align: right;
   text-align: left;
`;

export const RiaDivInputDiv = styled.div`
   box-sizing: border-box;
   margin: 0px;
   min-width: 0px;
   font-weight: 400;
   font-size: 16px;
`;

export const RiaDiv3_1 = styled.div`
   width: auto;
   cursor: pointer;
   padding: 6px 12px;
   text-align: center;
   gap: 4px;
   border-radius: 12px;
`;

export const RiaDiv3_1_text = styled.div`
   box-sizing: border-box;
   margin: 0px;
   min-width: 0px;
   font-weight: 400;
   font-size: 16px;
`;

export const RiaDiv3_2 = styled.div`
   width: auto;
   cursor: pointer;
   padding: 6px 12px;
   text-align: center;
   gap: 4px;
   border-radius: 12px;
   background: transparent;
`;

export const RiaDiv3_2_text = styled.div`
   box-sizing: border-box;
   margin: 0px;
   min-width: 0px;
   font-weight: 400;
   font-size: 16px;
`;

export const Selectdiv = styled.div`
   width: 100%;
   display: flex;
   padding: 0px;
   -webkit-box-align: center;
   align-items: center;
   -webkit-box-pack: start;
   justify-content: flex-start;
   box-sizing: border-box;
   margin: 0px;
   min-width: 0px;
`;

export const SelectInput = styled.input`
   background: url('https://app.uniswap.org/static/media/search.2f68ccda21d1e4407c50391c54ee413a.svg') 12px center / 20px 20px no-repeat scroll
      rgb(245, 246, 252);
   position: relative;
   display: flex;
   padding: 16px 16px 16px 40px;
   height: 40px;
   -webkit-box-align: center;
   align-items: center;
   width: 100%;
   white-space: nowrap;
   outline: none;
   border-radius: 12px;
   color: rgb(13, 17, 28);
   border: 1px solid rgb(210, 217, 238);
   appearance: none;
   font-size: 16px;
   transition: border 100ms ease 0s;
`;

export const Tagdiv = styled.div`
   display: grid;
   grid-auto-rows: auto;
   row-gap: 16px;
`;
export const Tagdiv1 = styled.div`
   flex-wrap: wrap;
   width: 100%;
   display: flex;
   padding: 0px;
   -webkit-box-align: center;
   align-items: center;
   -webkit-box-pack: start;
   justify-content: flex-start;
   gap: 8px;
`;

export const TokenTag = styled.div`
   border: 1px solid rgb(210, 217, 238);
   border-radius: 16px;
   display: flex;
   padding: 6px 12px 6px 6px;
   -webkit-box-align: center;
   align-items: center;
   cursor: pointer;
   font-weight: 600;
   img {
      width: 1.25rem;
      margin-right: 0.2rem;
   }
`;

export const Kondiv = styled.div`
   width: 100%;
   height: 1px;
   background-color: rgb(210, 217, 238);
`;

export const Listdiv = styled.div`
   width: 100%;
   height: 8.75rem;
`;

export const Itemdiv = styled.div`
   height: 56px;
   width: 100%;
   padding: 4px 20px;
   height: 56px;
   display: grid;
   grid-template-columns: auto minmax(auto, 1fr) auto minmax(0px, 72px);
   gap: 16px;
   cursor: pointer;
   opacity: 1;
   align-items: center;
   img {
      width: 2.25rem;
      height: 2.25rem;
   }
   &:hover {
      background-color: rgba(152, 161, 192, 0.08);
   }
`;
