import React from 'react';
import styled from 'styled-components';
import PriorityItem from './priorityItem';
import { getTextPriority } from '../../services/ditableService';

const StyledPriority = styled.div`
    position: absolute;
    bottom: -1px;
    left: -1px;
    z-index: 11;
    
    .select__head, .select__item {
        display: flex;
        align-items: center;
        padding: 5px;

        p {
            margin-left: 10px;
        }
    }

    .select__list {
        display: ${props => props.display};
        position: absolute;
        margin-left: ${props => props.left + 'px'};
        margin-top: ${props => props.top + 'px'};
        
        width: 200px;
        box-sizing: border-box;

        background-color: #fff;
        border: 1px solid #999;
        border-radius: 0 0 5px 5px;
    }

    .select__item {
        border-bottom: 1px solid #999;
        cursor: pointer;

        &:hover {
            background-color: #efefef;
        }

        &:last-of-type {
            border-bottom: none;
        }
    }
`;

const SelectPriorityItem = ({setPriority, display, setDisplay, top = 0, left = 0}) => {

    const changePriority = (priority) => {
        setPriority(priority);
        setDisplay(false);
    };
    
    return (
        <StyledPriority display={display ? 'block' : 'none'} top={top} left={left}>
            <ul className="select__list">
                {['5', '4', '3', '2', '1'].map(item => {
                    return (
                        <li key={item} className="select__item"
                            onClick={() => changePriority(item)}>
                            <PriorityItem priority={item}/>
                            <p>{getTextPriority(item)}</p>
                        </li>
                    );
                })}
            </ul>
        </StyledPriority>
    );
};

export default SelectPriorityItem;