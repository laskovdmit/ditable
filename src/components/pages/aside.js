import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledAside = styled.aside`
    height: 100vh;
    width: 400px;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 10;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    background-color: #fff;
    box-shadow: 0 5px 10px 0 #999;

    @media (max-width: 1200px) {
        width: 250px;
    }
    
    @media (max-width: 850px) {
        width: 100%;
        height: 100px;

        flex-direction: row;
    }

    .aside__item {
        width: 100%;
        height: 80px;

        color: inherit;
        text-decoration: none;
        
        display: flex;
        justify-content: center;
        align-items: center;

        text-transform: uppercase;
        cursor: pointer;

        @media (max-width: 850px) {
            width: 200px;
            height: 100%;

            flex-direction: row;
        }

        &--tasks {
            background-color: #faff60;

            :hover {
                background-color: #fbff8f;
            }

            :active {
                background-color: #fcffa8;
            }
        }

        &--table {
            background-color: #ff9c63;

            :hover {
                background-color: #ffab7a;
            }

            :active {
                background-color: #ffc3a1;
            }
        }
    }
`;

const Aside = () => {

    return (
        <StyledAside>
            <Link to="/tasks" className="aside__item aside__item--tasks">Задачи</Link>
            <Link to="/table" className="aside__item aside__item--table">Таблица</Link>
        </StyledAside>
    );
};

export default Aside;