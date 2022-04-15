import React from 'react';
import { Routes, Route } from 'react-router-dom';
import styled from 'styled-components';
import { Aside, TasksPage, TablePage } from '../pages';

const StyledWrapper = styled.div`
    padding-left: 400px;
    display: flex;

    @media (max-width: 1200px) {
        padding-left: 250px;
    }

    @media (max-width: 850px) {
        padding-left: 0;
        padding-top: 100px;
    }
`;

const App = () => {
    return (
        <StyledWrapper className="app">
            <Aside/>
                <Routes>
                    <Route path="/tasks" element={<TasksPage/>}/>
                    <Route path="/table" element={<TablePage/>}/>
                </Routes>
        </StyledWrapper>
    );
};

export default App;