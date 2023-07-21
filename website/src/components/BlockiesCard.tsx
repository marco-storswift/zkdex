import {styled, css} from 'styled-components';
// @ts-ignore
import Blockies from 'react-blockies';
import {BlockieProps} from "../model";

const resetCSS = css`
  border: none;
  box-sizing: border-box;
  line-height: 1;
  margin: 0;
  outline: none;
  padding: 0;
`;
const DivStyled = styled.div`
  ${resetCSS};
  border-radius: 50%;
  display: inline-flex;
  overflow: hidden;
`;

export default function BlockiesCard({seed, ...props}: BlockieProps) {
    return ( <DivStyled data-testid="test-blockie">
        <Blockies {...props} seed={seed?.toLowerCase()}/>
    </DivStyled>)
}