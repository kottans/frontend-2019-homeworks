import styled from 'styled-components';

const Score = styled.div`
  position: relative;
  display: inline-block;
  background-color: #bbada0;
  padding: 15px 25px;
  font-size: 25px;
  font-weight: bold;
  border-radius: 3px;
  color: white;
  min-width: 100px;
  margin-left: 20px;
  text-align: center;
  padding: 20px 25px 0;
  line-height: 47px;
  ::after {
    content: '${({ title }) => title}';
    position: absolute;
    width: 100%;
    top: 10px;
    left: 0;
    text-transform: uppercase;
    font-size: 13px;
    line-height: 13px;
    text-align: center;
    color: #eee4da;
  }
`;

export default Score;
