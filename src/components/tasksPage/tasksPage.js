import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import TasksList from "./tasksList";
import AddTask from "./addTask";
import styled from 'styled-components';
import { tasksLoaded, showLoading, hideLoading, showError, showAddTaskModal, closeAddTaskModal, showStatusMessage } from '../../actions';
import { FirebaseServiceContext } from '../serviceContext/serviceContext';
import Spinner from '../spinner';
import Error from '../error';
import AddTaskModal from './addTaskModal';
import ShowTaskModal from "./showTaskModal/showTaskModal";
import nextId from 'react-id-generator';
import { filterActiveSubtasks } from '../../services/ditableService';
import ModalWrap from "../modalWrap";

const StyledTasksPage = styled.div`
    flex-grow: 1;
    padding-top: 20px;
    color: #333;

    .tasks__period {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 20px;
        
        &-input {
            width: 60px;
            margin: 0 5px;
        }
    }

    .tasks__greetings {
        font-size: 20px;

        width: 300px;
        margin: 0 auto;
        text-align: center;
        
        & p {
            margin-bottom: 10px;

            &:first-of-type {
                font-size: 30px;
                font-weight: bold;
            }
        }
    }
`;

const TasksPage = ({tasksLoaded, showLoading, showError, hideLoading, showStatusMessage, ...props}) => {
    const firebaseService = useContext(FirebaseServiceContext);

    useEffect(() => {
        showLoading();
        firebaseService.listenChangingData('tasks/', (newData) => tasksLoaded(newData), showError);
    }, []);

    const completeTask = (task) => {
        showLoading();
        
        const newTask = {
            ...task,
            active: false
        };

        const statusMessage = {
            id: nextId('juke'),
            title: "Успех",
            type: "success",
            description: ""
        };

        if (task.type === "subtask") {
            firebaseService.postData(`tasks/${task.parentId}/subtasks/${task.id}`, newTask, showError);
            showStatusMessage({
                ...statusMessage,
                description: "Подзадача помечена как выполненная"
            });
        } else {
            const filteredTask = filterActiveSubtasks(task);

            if (!filteredTask.subtasks) {
                firebaseService.postData('tasks/' + task.id, newTask, showError);
                showStatusMessage({
                    ...statusMessage,
                    description: "Задача помечена как выполненная"
                });
            } else {
                if (filteredTask.subtasks.length === 0) {
                    firebaseService.postData('tasks/' + task.id, newTask, showError);
                    showStatusMessage({
                        ...statusMessage,
                        description: "Задача помечена как выполненная"
                    });
                } else {
                    showStatusMessage({
                        ...statusMessage,
                        title: "Ошибка",
                        type: "error",
                        description: "Невозможно выполнить задачу, когда есть активные подзадачи"
                    });
                }
            }
        }

        hideLoading();
    };

    const removeTask = (task) => {
        showLoading();
        
        switch (task.type) {
            case 'subtask':
                firebaseService.removeData(`tasks/${task.parentId}/subtasks/${task.id}`, showError);
                showStatusMessage({
                    id: nextId('htrg'),
                    title: "Успех",
                    type: "success",
                    description: "Подзадача успешно удалена"
                });
                break;
            case 'task':
                if (task.subtasks) {
                    showStatusMessage({
                        id: nextId('fhjk'),
                        title: "Ошибка",
                        type: "error",
                        description: "При удалении не должно быть активных подзадач"
                    });
                } else {
                    firebaseService.removeData('tasks/' + task.id, showError);
                    showStatusMessage({
                        id: nextId('asfg'),
                        title: "Успех",
                        type: "success",
                        description: "Задача успешно удалена"
                    });
                }
                break;
            default:
                break;
        }

        hideLoading();
    };

    return (
        <TasksPageRender
            {...props}
            completeTask={completeTask}
            removeTask={removeTask}/>
    );
};

const TasksPageRender = ({
    tasks, selectedTask, modalAddTaskState, loading, error,
    showAddTaskModal, closeAddTaskModal, completeTask, removeTask
    }) => {
    
    const [date, setDate] = useState('');
    const [period, setPeriod] = useState(30);
    const [display, setDisplay] = useState(true);

    const onChangePeriod = (e) => {
        const value = e.target.value;

        value > 180 ? setPeriod(180) :
        value < 0 ? setPeriod(1) : 
        value === "" ? setPeriod(value) :
        setPeriod(Math.floor(value))
    };

    if (error) {
        return <Error/>
    }

    if (loading) {
        return <Spinner/>
    }

    return (
        <StyledTasksPage>
            {tasks.length === 0 &&
                <ModalWrap closedFunc={() => {
                        document.body.style = '';
                        return setDisplay();
                        }}
                    display={display}
                    first>
                    <div className="tasks__greetings">
                        <p>Привет!</p>
                        <p>Вижу, что у тебя не добавлено еще ни одной задачи 😒</p>
                        <p>Давай я помогу тебе создать новую!</p>
                    </div>
                    <AddTask openFunc={() => {
                            setDisplay(false);
                            showAddTaskModal();
                        }}
                        setDate={setDate}
                        type={"first"}/>
                </ModalWrap>}
            <AddTaskModal
                choosenDate={date}/>
            <ShowTaskModal
                task={selectedTask}
                width="600px"
                height="auto"
                completeTask={completeTask}
                removeTask={removeTask}/>
            <div className="tasks__period">
                <label className="tasks__period-label" htmlFor="tasks__period">
                    Показать задачи на
                        <input className="tasks__period-input" id="tasks__period" type="number"
                        value={period}
                        onChange={onChangePeriod} />
                    дней вперед
                </label>
            </div>
            <TasksList
                tasks={tasks}
                openFunc={showAddTaskModal}
                setDate={setDate}
                period={period}
                completeTask={completeTask}
                removeTask={removeTask}/>
        </StyledTasksPage>
    );
};

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        selectedTask: state.selectedTask,
        modalAddTaskState: state.modalAddTaskState,
        loading: state.loading,
        error: state.error
    }
};

const mapDispatchToProps = {
    tasksLoaded,
    showLoading,
    hideLoading,
    showError,
    showAddTaskModal,
    closeAddTaskModal,
    showStatusMessage
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);