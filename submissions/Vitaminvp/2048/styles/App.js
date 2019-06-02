import styled from "styled-components";

const H1 = styled.h1`
  position: relative;
  font-size: 80px;
  line-height: 90px;
  color: #776e65;
  font-weight: bold;
  margin: 0;
  display: block;
  float: left;
  cursor: pointer;
  transition: all 0.5s ease-in-out;
  ::before {
    content: '';
    position: absolute;
    font-size: 20px;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
    color: #bbada0;
    left: 50%;
    white-space: nowrap;
    transform: translateX(-50%);
    opacity: 0.5;
  }
  :hover {
    ::before {
      content: 'Join the numbers and get to the 2048 tile!';
    }
  }
`;

const COLLEFT = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const COLRIGHT = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const P = styled.p`
  color: #776e65;
  max-width: 450px;
  > strong {
    color: #8bc34a;
`;

export {COLRIGHT, COLLEFT, P, H1};