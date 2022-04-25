import React from "react";
import styled from 'styled-components';
import { connect } from 'react-redux';
import PriorityItem from "../../priorityItem";
import { showModalTask } from "../../../actions";
import { getColor } from '../../../services/ditableService';

const StyledTasksListItem = styled.li`
    width: 400px;
    padding: 20px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;

    background-color: #ffffff;
    border: 1px solid #999;
    border-radius: 10px;
    box-shadow: 0 10px 10px #999;

    cursor: pointer;
    position: relative;

    &:hover {
        box-shadow: 0 10px 20px #555;
        
        .item__close {
            display: block;
            position: absolute;
            top: 0px;
            right: 5px;

            cursor: pointer;

            font-size: 30px;
            line-height: 30px;
        }

        .item__completeBtn {
            display: block;
        }
    }

    &:active {
        box-shadow: 0 10px 10px #999999;
    }

    .item__wrap {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .item__btns {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .item__title {
        font-weight: bold;
        margin-left: 15px;
    }

    .item__descr {
        font-weight: 300;
        margin-bottom: 10px;
    }

    .item__completiondate {
        padding: 5px 10px;
        cursor: pointer;

        color: #fff;
        background-color: ${props => props.color};

        border: none;
        border-radius: 3px;
    }

    .item__completeBtn {
        display: none;
        padding: 5px 10px;
        cursor: pointer;

        color: #fff;
        background-color: #32CD32;

        border: none;
        border-radius: 3px;

        &:hover {
            background-color: #77DD77;
        }
        
        &:active {
            background-color: #90EE90;
        }
    }

    .item__close {
        display: none;
    }
`;

const TasksListItem = ({task, showModalTask, completeTask, removeTask}) => {
    const {title, description, completionDate, priority} = task;
    const color = getColor(priority);

    const showModal = (e) => {
        if (!e.target.classList.contains('item__close') &&
            !e.target.classList.contains('item__completeBtn')) {
            showModalTask(task);
        }
    };

    return (
        <StyledTasksListItem color={color} onClick={showModal}>
            <div className="item__wrap">
                <PriorityItem
                    priority={priority}
                    color={color}/>
                <p className="item__title">{title}</p>
            </div>
            {description ?
                <div className="item__descr">
                    {description.length > 40 ? description.slice(0, 39) + '...' : description}
                </div>
            : null}
            <div className="item__btns">
                <button className="item__completiondate">{completionDate}</button>
                <button className="item__completeBtn" onClick={() => completeTask(task)}>Выполнить</button>
            </div>
            <div className="item__close" onClick={() => removeTask(task)}>&times;</div>
        </StyledTasksListItem>
    );
};

const mapStateToProps = (state) => {
    return {}
};

const mapDisatchToProps = {
    showModalTask
}

export default connect(mapStateToProps, mapDisatchToProps)(TasksListItem);