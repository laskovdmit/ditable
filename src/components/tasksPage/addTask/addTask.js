import React, { useState } from 'react';
import styled from 'styled-components';


const StyledBtn = styled.button`
    width: 200px;
    height: 40px;
    padding: 10px;

    display: block;
    margin: 0 auto;

    cursor: pointer;

    background-color: #fff;
    border: 1px solid #999;
    border-radius: 20px;
    box-shadow: 0 3px 5px 0 #999;

    :hover {
        box-shadow: 0 5px 5px 0 #777;
    }

    :active {
        box-shadow: 0 5px 5px 0 #999;
    }
`;

const StyledOutlineBtn = styled.button`
    border: none;
    background-color: inherit;
    margin-left: 5px;
    cursor: pointer;

    color: #666;
    
    :hover {
        color: #000;
        text-decoration: underline;
    }

    :active {
        color: #999;
    }
`;

const AddTask = ({openFunc, setDate, date = 0, outline}) => {

    if (outline) {
        return (
            <StyledOutlineBtn
                type="button"
                outline={outline}
                onClick={() => {
                    openFunc();
                    setDate(date);
                }}>
                + Добавить задачу
            </StyledOutlineBtn>
        )
    } else {
        return (
            <StyledBtn
                type="button"
                outline={outline}
                onClick={() => {
                    openFunc();
                    setDate(date);
                }}>
                + Добавить задачу
            </StyledBtn>
        )
    }
};

export default AddTask;