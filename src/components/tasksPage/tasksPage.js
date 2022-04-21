import React, { useContext, useEffect, useState } from "react";
import { connect } from "react-redux";
import TasksList from "./tasksList";
import AddTask from "./addTask";
import styled from 'styled-components';
import { tasksLoaded, showLoading, showError, closeModalTask } from '../../actions';
import { FirebaseServiceContext } from '../serviceContext/serviceContext';
import Spinner from '../spinner';
import Error from '../error';
import AddTaskModal from './addTaskModal';
import ShowTaskModal from "./showTaskModal";

const StyledTasksPage = styled.div`
    flex-grow: 1;
    /* background-color: #956BD6; */
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
`;

const TasksPage = ({tasks, selectedTask, modalTaskState, closeModalTask, loading, error, showLoading, showError, tasksLoaded}) => {
    const firebaseService = useContext(FirebaseServiceContext);
    const [addTaskDisplay, toggleAddTaskDispaly] = useState(false);
    const [date, setDate] = useState('');
    const [period, setPeriod] = useState(30);
    
    useEffect(() => {
        showLoading();
            
        firebaseService.listenChangingData('tasks/', (newData) => {
            tasksLoaded(newData);
        }, showError);
    }, []);

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
            <AddTaskModal
                display={addTaskDisplay}
                closedFunc={toggleAddTaskDispaly}
                choosenDate={date}/>
            <ShowTaskModal
                display={modalTaskState}
                closedFunc={closeModalTask}
                task={selectedTask}/>
            <div className="tasks__period">
                <label className="tasks__period-label" htmlFor="tasks__period">
                    Показать задачи на
                        <input className="tasks__period-input" id="tasks__period" type="number"
                        value={period}
                        onChange={onChangePeriod} />
                    дней вперед
                </label>
            </div>
            <AddTask
                display={addTaskDisplay}
                toggleFunc={toggleAddTaskDispaly}
                setDate={setDate}/>
            <TasksList
                tasks={tasks}
                display={addTaskDisplay}
                closedFunc={toggleAddTaskDispaly}
                setDate={setDate}
                period={period}/>
        </StyledTasksPage>
    );
};

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        selectedTask: state.selectedTask,
        modalTaskState: state.modalTaskState,
        loading: state.loading,
        error: state.error
    }
};

const mapDispatchToProps = {
    tasksLoaded,
    showLoading,
    showError,
    closeModalTask
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);