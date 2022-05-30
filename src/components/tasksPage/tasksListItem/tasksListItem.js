import React from "react";
import styled from 'styled-components';
import { connect } from 'react-redux';
import PriorityItem from "../../priorityItem";
import { showModalTask } from "../../../actions";

const StyledListItem = styled.li`
    width: 100%;
    padding: 20px;
    padding-left: 30px;
    padding-right: 110px;
    border-bottom: 1px solid #aaa;
    
    display: flex;
    align-items: center;

    cursor: pointer;
    position: relative;

    &:hover {
        background-color: #efefef;

        .item__close, .item__completeBtn {
            cursor: pointer;

            display: block;
            position: absolute;
            top: 50%;
            transform: translate(0, -50%);
            font-size: 22px;

            width: 30px;
            height: 30px;
            padding: 0;
            border: none;
        }

        .item__close {
            right: 15px;
            color: #555;

            &:hover i{
                color: #999;
            }

            &:active i{
                color: #bbb;
            }
        }

        .item__completeBtn {
            font-size: 30px;
            font-weight: bold;

            border-radius: 50%;
            right: 60px;
            color: #00CC00;

            &:hover {
                color: #45E645;
            }

            &:active {
                color: #67E667;
            }
        }
    }

    .item__info {
        padding-left: 15px;
    }

    .item__label {
        display: inline-block;
        border: 1px solid #999;
        border-radius: 5px;
        background-color: inherit;
        padding: 2px 5px;
        margin-bottom: 5px;

        font-weight: 300;
        font-size: 13px;
    }

    .item__title {
        font-size: 20px;
        margin-bottom: 5px;
    }

    .item__descr {
        font-size: 14px;
        font-weight: 300;
        word-break: break-all;
    }

    .item__close, .item__completeBtn {
        display: none;
    }
`;

const StyledTaskListItem = styled(StyledListItem)`
`;

const StyledSubtaskListItem = styled(StyledListItem)`
    padding-left: 50px;

    .item__title {
        font-size: 18px;
        margin-bottom: 0;
    }
`;

const Wrapper = ({type, children, ...props}) => {
    if (type === 'task') {
        return (
            <StyledTaskListItem {...props}>
                {children}
            </StyledTaskListItem>
        );
    } else {
        return (
            <StyledSubtaskListItem {...props}>
                {children}
            </StyledSubtaskListItem>
        );
    }
}

const TasksListItem = ({task, showModalTask, completeTask, removeTask, type}) => {
    const {title, description, priority} = task;
    let shortTitle = title.length > 40 ? title.slice(0, 39) + '...' : title;
    let shortDescr = "";

    if (task.type === "task") {
        shortDescr = description.length > 130 ? description.slice(0, 129) + '...' : description;
    }

    const showModal = (e) => {
        const classNames = ['item__close', 'item__completeBtn', 'fa-solid'];
        if (!classNames.some((elem) => e.target.classList.contains(elem))) {
            showModalTask(task);
        }
    };
    
    return (
        <Wrapper type={type} onClick={showModal}>
            <div>
                <PriorityItem priority={priority}/>
            </div>
            <div className="item__info">
                {task.type === "subtask" ?
                    <span className="item__label">
                        Подзадача
                    </span>
                : null}
                <p className="item__title">{shortTitle}</p>
                {shortDescr ?
                    <div className="item__descr">
                        {shortDescr}
                    </div>
                : null}
            </div>
            <button title={task.type === "task" ? "Выполнить задачу" : "Выполнить подзадачу"} className="item__completeBtn" onClick={() => removeTask(task)}>
                <i className="fa-solid fa-check"></i>
            </button>
            <button title={task.type === "task" ? "Удалить задачу" : "Удалить подзадачу"} className="item__close" onClick={() => removeTask(task)}>
                <i className="fa-solid fa-trash-can"></i>
            </button>
        </Wrapper>
    );
};

const mapStateToProps = (state) => {
    return {}
};

const mapDisatchToProps = {
    showModalTask
}

export default connect(mapStateToProps, mapDisatchToProps)(TasksListItem);