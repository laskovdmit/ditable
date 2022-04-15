import React from "react";
import styled from 'styled-components';
import TasksListItem from "../tasksListItem/";

const StyledUl = styled.ul`
    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
    align-items: center;
`;

const TasksList = ({tasks}) => {
    return (
        <StyledUl>
            {
                tasks.map(task => <TasksListItem key={task.id} task={task}/>)
            }
        </StyledUl>
    );
};

export default TasksList;