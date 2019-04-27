import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
    box-sizing: border-box;
    min-width: 150px;
    display: block;
    text-align: center;
    line-height: 24px;
    padding: 15px 0;
    margin-bottom: 20px;
    font-size: 14px;
    color: #7DF1E8;
    text-transform: uppercase;
    background-color:#099389;
    border-radius: 20px;
    white-space: pre-wrap;
    :hover {
    background-color:#3AAAA1; 
    };
    @media screen and (min-width:400px) and (max-width:500px) {
    padding: 10px;
    font-size:12px;
    }
    @media screen and (max-width:400px) {
    padding: 5px;
    font-size:12px;
    }
`;

const SortButtons = ({ handleSort }) => {
    const onClick = (ev) => {
        const id = ev.target.id;
        handleSort({ id });
    }
    return (
        <>
            <Button onClick={onClick} id="sortNameUp" type="button">
                Sort by name {'\n'}
                A &#8658; Z
            </Button>
            <Button onClick={onClick} id="sortNameDown" type="button">
                Sort by name {'\n'}
                Z &#8658; A
            </Button>
            <Button onClick={onClick} id="sortAgeUp" type="button">
                Sort by age  &#8657;
            </Button>
            <Button onClick={onClick} id="sortAgeDown" type="button">
                Sort by age   &#8659;
            </Button>
        </>
    );
}

export default SortButtons
