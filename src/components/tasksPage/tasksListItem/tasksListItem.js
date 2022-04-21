import React, { useState, useContext } from "react";
import styled from 'styled-components';
import { connect } from 'react-redux';
import PriorityItem from "../../priorityItem";
import { showLoading, showError, showCurrentTask } from "../../../actions";
import { FirebaseServiceContext } from '../../serviceContext/serviceContext';
import { getColour } from '../../../services/ditableService';

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
        cursor: pointer;

        color: #fff;
        background-color: ${props => props.color};

        border: 1px solid ${props => props.color};
        border-radius: 3px;
    }

    .item__close {
        display: none;
    }
`;

const TasksListItem = ({task, showLoading, showError, showCurrentTask}) => {
    const {id, title, description, completionDate, priority} = task;
    const firebaseService =  useContext(FirebaseServiceContext);
    const color = getColour(priority);

    const [display, toggleDispaly] = useState(false);

    const removeTask = () => {
        showLoading();
        firebaseService.removeData('tasks/' + id, showError);
    };

    const onShowModal = () => {
        showCurrentTask(task);
        display ? toggleDispaly(false) : toggleDispaly(true)
    };

    return (
        <>
            <StyledTasksListItem color={color} onClick={onShowModal}>
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
                <button className="item__completiondate">{completionDate}</button>
                <div className="item__close" onClick={removeTask}>&times;</div>
            </StyledTasksListItem>
        </>
    );
};

const mapStateToProps = (state) => {
    return {}
};

const mapDisatchToProps = {
    showLoading,
    showError,
    showCurrentTask
}

export default connect(mapStateToProps, mapDisatchToProps)(TasksListItem);