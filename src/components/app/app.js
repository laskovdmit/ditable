import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import AsideMenu from '../asideMenu';
import TasksPage from '../tasksPage';
import TablePage from '../tablePage';

const StyledWrapper = styled.div`
    display: flex;
    padding-top: 80px;
`;

const App = () => {
    return (
        <StyledWrapper className="app">
            <AsideMenu/>
            <Routes>
                <Route path="/" element={<div></div>}/>
                <Route path="/tasks" element={<TasksPage/>}/>
                <Route path="/table" element={<TablePage/>}/>
            </Routes>
        </StyledWrapper>
    );
};

export default App;