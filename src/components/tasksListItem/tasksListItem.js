import React, { useState, useContext } from "react";
import styled from 'styled-components';
import { connect } from 'react-redux';
import PriorityItem from "../priorityItem";
import ShowTaskModal from "../modals/showTaskModal/";
import { deleteTask, showLoading, showError } from "../../actions";
import DitableServiceContext from '../ditableServiceContext';

const StyledTasksListItem = styled.li`
    width: 400px;
    padding: 20px;
    margin: 20px 0;

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
    }

    &:active {
        box-shadow: 0 10px 10px #999999;
    }

    .item__wrap {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
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

        color: #fff;
        background-color: ${props => props.color};

        border: 1px solid ${props => props.color};
        border-radius: 3px;
    }

    .item__close {
        display: none;
    }
`;

const TasksListItem = ({task, deleteTask, showLoading, showError}) => {
    const {id, title, description, completionDate, priority} = task;
    let color;

    const [display, toggleDispaly] = useState(false);
    const ditableService = useContext(DitableServiceContext);

    const removeTask = () => {
        deleteTask(id);
        // showLoading();

        // ditableService.deleteTask(task)
        //     .then(() => deleteTask(id))
        //     .catch(() => showError());
    };
    
    const onChangeDispaly = (e) => {
        if (e.target === e.currentTarget) {
            return display ? toggleDispaly(false) : toggleDispaly(true);
        }
    };

    switch (priority) {
        case '5':
            color = '#8B0000';
            break;
        case '4':
            color = '#DC143C';
            break;
        case '3':
            color = '#FF4500';
            break;
        case '2':
            color = '#FFA500';
            break;
        default:
            color = '#FA8072';
            break;
    }

    return (
        <>
            <StyledTasksListItem
                color={color}
                onClick={onChangeDispaly}>
                <div className="item__wrap">
                    <PriorityItem
                        priority={priority}
                        color={color}/>
                    <p className="item__title">{title}</p>
                </div>
                {description ? <div className="item__descr">{description}</div> : null}
                <button className="item__completiondate">{completionDate}</button>
                <div className="item__close"
                    onClick={removeTask}>&times;</div>
            </StyledTasksListItem>
            <ShowTaskModal
                display={display}
                closedFunc={toggleDispaly}
                task={task}
                color={color}/>
        </>
    );
};

const mapStateToProps = (state) => {
    return {}
};

const mapDisatchToProps = {
    deleteTask,
    showLoading,
    showError
}

export default connect(mapStateToProps, mapDisatchToProps)(TasksListItem);