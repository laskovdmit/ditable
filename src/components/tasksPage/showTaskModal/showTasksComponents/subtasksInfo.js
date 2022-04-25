import React from 'react';
import styled from 'styled-components';
import TaskRef from './taskRef';
import { filterActiveSubtasks } from '../../../../services/ditableService';

const StyledWrapper = styled.div`
    .subtasks__info {
        font-size: 20px;
        font-weight: bold;

        margin-bottom: 15px;
    }

    .subtasks__list {
        border: 1px solid #999;
        border-radius: 7px;
        margin-bottom: 15px;
        pointer-events: none;

        overflow: hidden;

        li {
            pointer-events: auto;
        }
    }

    .subtasks__btn {
        background-color: inherit;
        border: none;
        padding: 0;
        
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }
`;

const SubtaskInfo = ({task, display, setDisplay, closeModal, showModal}) => {
    const filteredTask = filterActiveSubtasks(task);
    const {subtasks} = filteredTask;
    let subtasksArray;

    if (subtasks) {
        if (subtasks.length > 0) {
            subtasksArray = Object.keys(subtasks).map(key => subtasks[key]);
        }
    }

    return (
        <StyledWrapper>
            <p className="subtasks__info">Подзадачи:</p>
            {subtasksArray &&
                <ul className="subtasks__list">
                    {subtasksArray.map(subtask => {
                        return <TaskRef
                                key={subtask.id}
                                task={subtask}
                                closeModal={closeModal}
                                showModal={showModal}/>
                    })}
                </ul>
            }
            <button className="subtasks__btn"
                onClick={() => setDisplay(!display)}>+ Добавить подзадачу</button>
        </StyledWrapper>
    );
};

export default SubtaskInfo;