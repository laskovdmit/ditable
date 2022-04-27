import React from 'react';
import styled from 'styled-components';
import PriorityItem from '../../../priorityItem';

const StyledTaskRef = styled.li`
    display: flex;
    align-items: center;
    padding: 5px 10px;

    border-bottom: 1px solid #999;
    cursor: pointer;

    &:hover {
        background-color: #efefef;
    }

    &:last-of-type {
        margin-bottom: 0;
        border-bottom: none;
    }

    .item__title {
        margin: 0 10px;
    }
`;

const TaskRef = ({task, closeModal, showModal}) => {
    const {title, description, priority} = task;

    return (
        <StyledTaskRef onClick={() => {
                const reopen = async () => {
                    await closeModal();
                    showModal(task);
                };
                reopen();
            }}>
            <PriorityItem priority={priority}/>
            <span className="item__title">{title && title.length > 50 ? title.slice(0, 49) + '...' : title}:</span>
        </StyledTaskRef>
    );
};

export default TaskRef;