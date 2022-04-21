import React, { useState, useContext, useEffect } from 'react';
import { connect } from 'react-redux';
import { FirebaseServiceContext } from '../serviceContext/serviceContext';
import { tasksLoaded, showLoading, showError } from '../../actions';
import styled from 'styled-components';
import GoalsAside from './goalsAside';
import Spinner from '../spinner';
import Error from '../error';
import AddGoalModal from './addGoalModal';

const StyledGoalsPage = styled.div`
    /* position: relative; */
    overflow: hidden;

    flex-grow: 1;
    height: 85vh;
    background-color: #7279D8;
`;

const GoalsPage = ({tasks, loading, error, tasksLoaded, showLoading, showError}) => {
    const [display, toggleDispaly] = useState(false);
    const [size, setSize] = useState(300);
    const firebaseService = useContext(FirebaseServiceContext);
    
    useEffect(() => {
        showLoading();
            
        firebaseService.listenChangingData('tasks/', (newData) => {
            tasksLoaded(newData);
        }, showError);
    }, []);

    if (error) {
        return <Error/>
    }

    if (loading) {
        return <Spinner/>
    }

    return (
        <StyledGoalsPage>
            <GoalsAside
                width={size}
                setSize={setSize}
                tasks={tasks}
                display={display}
                closedFunc={toggleDispaly}/>
            <AddGoalModal
                showLoading={showLoading}
                showError={showError}
                error={error}
                display={display}
                closedFunc={toggleDispaly}/>
        </StyledGoalsPage>
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

export default connect(mapStateToProps, mapDispatchToProps)(GoalsPage);