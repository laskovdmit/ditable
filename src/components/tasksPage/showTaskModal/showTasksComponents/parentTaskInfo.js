import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import TaskRef from './taskRef';

const StyledWrap = styled.div`
    .parent__info {
        font-size: 20px;
        font-weight: bold;

        margin-bottom: 10px;
    }

    .parent__item {
        border: 1px solid #999;
        border-radius: 7px;
        margin-bottom: 15px;

        overflow: hidden;
        cursor: pointer;
        pointer-events: none;

        li {
            pointer-events: auto;
        }

        &:hover {
            background-color: #efefef;
        }
    }
`;

const ParentTaskInfo = ({parentId, getParent, closeModal, showModal}) => {
    const [parent, setParent] = useState([]);

    useEffect(() => {
        getParent('tasks/' + parentId)
        .then(res => {
            setParent(res);
        });
    }, [parentId, getParent]);

    return (
        <StyledWrap>
            <p className="parent__info">Родительская задача:</p>
            <ul className="parent__item">
                <TaskRef
                    task={parent}
                    closeModal={closeModal}
                    showModal={showModal}/>
            </ul>
        </StyledWrap>
    );
};

export default ParentTaskInfo;