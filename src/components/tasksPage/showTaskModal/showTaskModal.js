import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import nextId from 'react-id-generator';
import ModalWrap from '../../modalWrap';
import { getZero } from '../../../services/ditableService';
import { FirebaseServiceContext } from '../../serviceContext/serviceContext';
import { showLoading, showError, closeModalTask, showModalTask, showStatusMessage } from '../../../actions/';
import { getPostingDate } from '../../../services/ditableService';
import TaskInfo from './showTasksComponents/taskInfo';
import SubtasksInfo from './showTasksComponents/subtasksInfo';
import AddSubtasksItem from './showTasksComponents/addSubtasksItem';
import ParentTaskInfo from './showTasksComponents/parentTaskInfo';
import { getColor } from '../../../services/ditableService';

const StyledWrapper = styled.div`
    display: ${props => props.display};
    margin-bottom: 5px;
`;

const StyledBtn = styled.button`
    display: block;
    width: 150px;
    padding: 10px 20px;
    border: none;
    border-radius: 7px;
    
    cursor: pointer;
    font-weight: bold;
`;

const StyledCompleteBtn = styled(StyledBtn)`
    background-color: ${props => props.color};
    margin-right: 15px;
    color: #fff;

    &:hover {
        background-color: ${props => props.hoverColor};
    }
    
    &:active {
        background-color: ${props => props.activeColor};
    }
`;

const StyledDeleteBtn = styled(StyledBtn)`
    background-color: #fff;
    border: 2px solid #d6d6d6;
    color: rgba(0, 0, 0, .88);

    :hover {
        background-color: #e6e6e6;
    }

    :active  {
        background-color: #efefef;
    }
`;

const ShowTaskModal = ({
    error, modalTaskState, showError, showLoading, closeModalTask, showModalTask, showStatusMessage,
    task = {}, completeTask, removeTask, ...props
    }) => {
    const firebaseService = useContext(FirebaseServiceContext);
    const isEmpty = Object.keys(task).length === 0;
    const {id, creationDate, completionDate} = task;
    const [display, setDisplay] = useState(false);
    const color = getColor(task.priority);
    
    if (isEmpty) {
        return null;
    }

    if (error) {
        closeModalTask();
    }

    const postTaskData = (e, obj) => {
        e.preventDefault();
        showLoading();

        const parseDate = new Date(Date.parse(obj.newDate));
        const completionDate = `${getZero(parseDate.getDate())}.${getZero(parseDate.getMonth() + 1)}.${parseDate.getFullYear()}`;

        const newTask = {
            id: id,
            active: true,
            type: task.type,
            title: obj.newTitle,
            description: obj.newDescr,
            creationDate: creationDate,
            completionDate: completionDate,
            priority: obj.newPriority
        };

        if (task.type === "subtask") {
            newTask.parentId = task.parentId;
            firebaseService.postData(`tasks/${task.parentId}/subtasks/${id}`, newTask, showError);
            showStatusMessage({
                id: nextId('dfbfd'),
                title: "Успех",
                type: "success",
                description: "Подзадача успешно отредактирована"
            });
        } else {
            newTask.subtasks = task.subtasks ? task.subtasks : [];
            firebaseService.postData('tasks/' + id, newTask, showError);
            showStatusMessage({
                id: nextId('hrwq'),
                title: "Успех",
                type: "success",
                description: "Задача успешно отредактирована"
            });
        }

        closeModalTask();
    };

    const postSubtaskData = (e, obj) => {
        e.preventDefault();
        showLoading();

        const today = new Date();
        const currentDate = getPostingDate(today);

        const parseDate = new Date(Date.parse(obj.date));
        const completionDate = getPostingDate(parseDate);

        const newTask = {
            id: nextId() + Math.floor(Math.random() * 100000),
            active: true,
            type: "subtask",
            title: obj.title,
            description: obj.descr,
            creationDate: currentDate,
            completionDate: completionDate,
            priority: obj.priority,
            parentId: task.id
        };

        firebaseService.postData(`tasks/${task.id}/subtasks/${newTask.id}`, newTask, showError);
        closeModalTask();
        showStatusMessage({
            id: nextId('ifkh'),
            title: "Успех",
            type: "success",
            description: "Подзадача успешно добавлена"
        });
    };

    const closeModal = () => {
        closeModalTask();
        setDisplay(false);
    };

    return (
        <ModalWrap display={modalTaskState} closedFunc={closeModal} {...props}>
            <TaskInfo
                task={task}
                display={modalTaskState}
                postData={postTaskData}/>
            {task.type === 'task' ? <>
                <SubtasksInfo
                    task={task}
                    display={display}
                    setDisplay={setDisplay}
                    closeModal={closeModal}
                    showModal={showModalTask}/>
                <AddSubtasksItem
                    choosenDate={completionDate}
                    display={display}
                    postData={postSubtaskData}
                    setDisplay={setDisplay}
                    showStatusMessage={showStatusMessage}/>
            </> : null}
            {task.type === 'subtask' ? 
                <ParentTaskInfo
                    parentId={task.parentId}
                    getParent={firebaseService.getData}
                    closeModal={closeModal}
                    showModal={showModalTask}/>
            : null}
            <StyledWrapper display={!display ? 'flex' : 'none'}>
                <StyledCompleteBtn
                    color={color.main}
                    hoverColor={color.hover}
                    activeColor={color.active}
                    onClick={() => {
                        removeTask(task);
                        closeModal();}}>
                    Выполнить
                </StyledCompleteBtn>
                <StyledDeleteBtn
                    color={color.main}
                    hoverColor={color.hover}
                    activeColor={color.active}
                    onClick={() => {
                        removeTask(task);
                        closeModal();}}>
                    Удалить
                </StyledDeleteBtn>
            </StyledWrapper>
        </ModalWrap>
    );
};

const mapStateToProps = (state) => {
    return {
        error: state.error,
        modalTaskState: state.modalTaskState
    }
};

const mapDispatchToProps = {
    showLoading,
    showError,
    showModalTask,
    closeModalTask,
    showStatusMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(ShowTaskModal);