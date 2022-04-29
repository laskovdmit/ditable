import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
// import AsideMenu from '../asideMenu';
// import GoalsPage from '../goalsPage';
import TasksPage from '../tasksPage';
// import TablePage from '../tablePage';
import StatusWrapper from '../statusMessage/statusWrapper';
import { getScrollWidth } from '../../services/ditableService';
import AddTask from '../tasksPage/addTask';
import { showAddTaskModal } from '../../actions';

const StyledWrapper = styled.div`
    .app__title {
        position: fixed;
        z-index: 3;

        /* display: flex;
        justify-content: center;
        align-items: center; */
        
        width: 100%;
        padding-top: 30px;
        padding-bottom: 30px;
        padding-right: ${props => props.marginLeft + 'px'};

        background-color: #fff;

        text-align: center;
        font-size: 40px;
        font-weight: bold;
    }

    .app__month {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-top: 15px;

        & p {
            font-size: 30px;
            margin-right: 20px;
        }
    }

    .app__tasks {
        padding-top: 166px;
    }
`;

const App = ({modalTaskState, modalAddTaskState, showAddTaskModal}) => {
    const [month, setMonth] = useState();

    return (
        <StyledWrapper className="app" marginLeft={(modalTaskState || modalAddTaskState) ? getScrollWidth() : 0}>
            {/* <AsideMenu/> */}
            <div className="app__title">
                DITable
                <div className="app__month">
                    <p>{month}</p>
                    <AddTask openFunc={showAddTaskModal}/>
                </div>
            </div>
            <Routes>
                <Route path="/" element={<TasksPage setMonth={setMonth}/>}/>
                {/* <Route path="/goals" element={<GoalsPage/>}/> */}
                {/* <Route path="/tasks" element={<TasksPage/>}/>
                <Route path="/table" element={<TablePage/>}/> */}
            </Routes>
            <StatusWrapper/>
        </StyledWrapper>
    );
};

const mapStateToProps = (state) => {
    return {
        modalTaskState: state.modalTaskState,
        modalAddTaskState: state.modalAddTaskState
    }
};

const mapDispatchToProps = {
    showAddTaskModal
};

export default connect(mapStateToProps, mapDispatchToProps)(App);