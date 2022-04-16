import React from 'react';
import styled from 'styled-components';
import ModalWrap from '../../modalWrap';
import PriorityItem from '../../priorityItem/';

const ShowTaskModal = ({task, color, ...props}) => {
    const {title, description, completionDate, priority} = task;

    return (
        <ModalWrap {...props}>
            <PriorityItem
                        priority={priority}
                        color={color}/>
            <h2>Данные о задаче: {title}</h2>
            <div>{description}</div>
            <div>{completionDate}</div>
        </ModalWrap>
    );
};

export default ShowTaskModal;