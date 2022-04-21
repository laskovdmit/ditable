import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledAside = styled.aside`
    height: 80px;
    width: 100%;

    position: fixed;
    top: 0;
    left: 0;
    z-index: 9;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    background-color: #fff;
    box-shadow: 0 5px 10px 0 #999;

    .aside__item {
        width: 200px;
        height: 100%;

        color: inherit;
        text-decoration: none;
        
        display: flex;
        justify-content: center;
        align-items: center;

        color: #fff;
        font-weight: bold;
        text-transform: uppercase;
        cursor: pointer;

        &--goals {
            background-color: #1924B1;

            :hover {
                background-color: #4671D5;
            }

            :active {
                background-color: #7279D8;
            }
        }

        &--tasks {
            background-color: #4E10AE;

            :hover {
                background-color: #7D44D6;
            }

            :active {
                background-color: #956BD6;
            }
        }

        &--table {
            background-color: #0969A2;

            :hover {
                background-color: #3D9AD1;
            }

            :active {
                background-color: #64A8D1;
            }
        }
    }
`;

const AsideMenu = () => {

    return (
        <StyledAside>
            {/* <Link to="/goals" className="aside__item aside__item--goals">Цели</Link> */}
            <Link to="/tasks" className="aside__item aside__item--tasks">Задачи</Link>
            <Link to="/table" className="aside__item aside__item--table">Таблица</Link>
        </StyledAside>
    );
};

export default AsideMenu;