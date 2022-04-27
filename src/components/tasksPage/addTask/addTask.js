import React from 'react';
import styled from 'styled-components';


const StyledBtn = styled.button`
    display: block;
    padding: 10px;
    margin: 0 auto;
    margin-top: 15px;
    cursor: pointer;

    font-weight: 300;
    border: 1px solid #999;
    border-radius: 7px;
    box-shadow: 1px 3px 5px 0 #ddd;
    background-color: #fff;

    :hover {
        box-shadow: 1px 3px 5px 0 #aaa;
    }

    :active {
        box-shadow: 1px 3px 5px 0 #eee;
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

const StyledFirstBtn = styled(StyledBtn)`
    padding: 15px 20px;
    font-size: 20px;
    font-weight: 500;
    box-shadow: none;

    :hover {
        box-shadow: none;
        background-color: #efefef;
    }

    :active {
        box-shadow: none;
        background-color: #fff;
    }
`;

const AddTask = ({openFunc, setDate, date = 0, type}) => {

    if (type === 'outline') {
        return (
            <StyledOutlineBtn
                className="tasks__addItem"
                type="button"
                onClick={() => {
                    openFunc();
                    setDate(date);
                }}>
                + Добавить задачу
            </StyledOutlineBtn>
        )
    } else if (type === "first") {
        return (
            <StyledFirstBtn
                className="tasks__addItem"
                type="button"
                onClick={() => {
                    openFunc();
                    setDate(date);
                }}>
                + Добавить первую задачу
            </StyledFirstBtn>
        );
    } else {
        return (
            <StyledBtn
                className="addItem"
                type="button"
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