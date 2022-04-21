import React, { useState } from 'react';
import styled from 'styled-components';

const StyledGoalsAside = styled.aside`
    width: ${props => props.width + 'px'};
    height: 100%;
    padding: 40px 20px;
    user-select: none; 
    
    position: fixed;
    background-color: #f3f3f3;

    .aside__btn {
        display: block;
        width: 200px;
        height: 40px;
        margin: 0 auto;
        margin-bottom: 30px;

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
    }

    .aside__drag {
        position: absolute;
        top: 0;
        right: -2px;

        width: 5px;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.1);

        cursor: col-resize;
    }

    .aside__goal {
        padding-left: 20px;
        margin-bottom: 5px;
    }
`;

const GoalsAside = ({width, setSize, tasks, display, closedFunc}) => {

    const startChangeSize = () => {
        const moveAt = (x) => {
            const maxSize = 600;
            const minSize = 250;
            const currentSize = x < minSize ? minSize : x > maxSize ? maxSize : x;

            setSize(currentSize);
        };

        const onMouseMove = (e) => {
            moveAt(e.clientX)
        };

        document.addEventListener('mousemove', onMouseMove);

        document.addEventListener('mouseup', () => {
            document.removeEventListener('mousemove', onMouseMove);
        }, {once: true});
    };

    return (
        <StyledGoalsAside width={width}>
            <div className="aside__drag" onMouseDown={startChangeSize}></div>
            <button className="aside__btn"
                onClick={() => display ? closedFunc(false) : closedFunc(true)}>+ Новая цель</button>
            {tasks.map((task, i) => {
                return (
                    <div className="aside__goal" key={task.id}>{`${i + 1}. ${task.title}`}</div>
                );
            })}
        </StyledGoalsAside>
    );
};

export default GoalsAside;