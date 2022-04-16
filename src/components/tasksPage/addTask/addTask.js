import React, {useState} from 'react';
import styled from 'styled-components';
import AddTaskModal from '../addTaskModal';


const StyledDiv = styled.div`
    width: 400px;
    margin: 0 auto;
    margin-top: 20px;

    button {
        padding: 10px;

        border: 1px solid;
        border-radius: 3px;
        background-color: inherit;

        cursor: pointer;

        &:hover {
            box-shadow: 0 2px 5px 0 #555;
        }

        &:active {
            box-shadow: 0 2px 5px 0 #999;
        }
    }
`;

const AddTask = () => {
    const [display, toggleDispaly] = useState(false);
    
    return (
        <>
            <StyledDiv>
                <button
                    type="button"
                    onClick={() => display ? toggleDispaly(false) : toggleDispaly(true)}>Добавить задачу</button>
            </StyledDiv>
            <AddTaskModal display={display} closedFunc={toggleDispaly}/>
        </>
    );
};

export default AddTask;