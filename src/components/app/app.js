import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
// import AsideMenu from '../asideMenu';
// import GoalsPage from '../goalsPage';
import TasksPage from '../tasksPage';
// import TablePage from '../tablePage';
import StatusWrapper from '../statusMessage/statusWrapper';

const StyledWrapper = styled.div`
    /* display: flex; */
    /* padding-top: 80px; */

    .app__title {
        padding-top: 30px;
        padding-bottom: 10px;

        text-align: center;
        font-size: 40px;
        font-weight: bold;
    }
`;

const App = () => {
    return (
        <StyledWrapper className="app">
            {/* <AsideMenu/> */}
            <div className="app__title">DITable</div>
            <Routes>
                <Route path="/" element={<TasksPage/>}/>
                {/* <Route path="/goals" element={<GoalsPage/>}/> */}
                {/* <Route path="/tasks" element={<TasksPage/>}/>
                <Route path="/table" element={<TablePage/>}/> */}
            </Routes>
            <StatusWrapper/>
        </StyledWrapper>
    );
};

export default App;