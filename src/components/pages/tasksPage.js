import React, { useContext, useEffect } from "react";
import { connect } from "react-redux";
import TasksList from "../tasksList";
import AddTask from "../addTask";
import styled from 'styled-components';
import { tasksLoaded, showLoading, showError } from '../../actions';
import DitableServiceContext from '../ditableServiceContext';
import Spinner from '../spinner';
import Error from '../error';

const StyledTasksPage = styled.div`
    flex-grow: 1;
`;

const TasksPage = ({tasks, loading, error, showLoading, showError, tasksLoaded}) => {
    const ditableService = useContext(DitableServiceContext);
    
    useEffect(() => {
        showLoading();

        ditableService.getTasks()
            .then(res => tasksLoaded(res))
            .catch(() => showError());
    }, []);

    if (error) {
        return <Error/>
    }

    if (loading) {
        return <Spinner/>
    }

    return (
        <StyledTasksPage>
            <AddTask/>
            <TasksList tasks={tasks}/>
        </StyledTasksPage>
    );
};

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        loading: state.loading,
        error: state.error
    }
};

const mapDispatchToProps = {
    tasksLoaded,
    showLoading,
    showError
};

export default connect(mapStateToProps, mapDispatchToProps)(TasksPage);