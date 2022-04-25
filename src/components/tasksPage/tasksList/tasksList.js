import React from "react";
import styled from 'styled-components';
import TasksListItem from "../tasksListItem/";
import { getZero, filterActiveSubtasks } from "../../../services/ditableService";
import AddTask from "../addTask";

const StyledUl = styled.ul`
    width: 600px;
    margin: 0 auto;
    padding: 0;
    padding-top: 20px;

    position: relative;
    display: flex;
    flex-direction: column;
    
    border-left: 1px solid #999;

    &::before {
        content: "";

        position: absolute;
        top: -5px;
        left: -5px;

        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #999;
    }

    .tasks__item {
        display: flex;
        flex-direction: column;

        margin-bottom: 5px;

        &--indicated {
            padding: 10px 0;

            .tasks__date {
                font-size: 20px;
                font-weight: bold;
                text-align: center;

                position: relative;
                border-bottom: none;
                padding: 10px 20px;

                &::before {
                    content: "";

                    position: absolute;
                    top: 50%;
                    left: 0;

                    width: 230px;
                    height: 1px;
                    background-color: #999;
                }

                &::after {
                    content: "";

                    position: absolute;
                    top: 50%;
                    left: -5px;
                    transform: translate(0, -50%);

                    width: 10px;
                    height: 10px;
                    border-radius: 50%;
                    background-color: #999;
                }
            }
        }
    }

    .tasks__date {
        font-weight: 300;
        padding: 5px 20px;
        position: relative;
    }
`;

const getDateArray = (date, daysCount) => {
    const oneDay = 86400000;
    let dateArr = [];

    for (let i = 0; i < daysCount; i++) {
        const newDate = new Date(date + oneDay * i);
        const newDateStrng = `${getZero(newDate.getDate())}.${getZero(newDate.getMonth() + 1)}.${newDate.getFullYear()}`;
        dateArr.push(newDateStrng);
    }

    return dateArr;
};

const TasksList = ({tasks, display, openFunc, closedFunc, setDate, period, completeTask, removeTask}) => {
    const today = Date.parse(new Date());
    const dateArray = getDateArray(today, period);
    const tasksDateArray = [];

    tasks.forEach(task => {
        if (task.active) {
            tasksDateArray.push(task.completionDate);
        }
        
        if (task.subtasks) {
            const filteredTask = filterActiveSubtasks(task);

            for (let key in filteredTask.subtasks) {
                tasksDateArray.push(filteredTask.subtasks[key].completionDate); 
            }
        }
    });

    return (
        <StyledUl>
            {
                dateArray.map(date => {
                    const matchesDate = tasksDateArray.filter(taskDate => taskDate === date);
                    const isDateMatch = matchesDate.length !== 0 ? true : false;

                    if (isDateMatch) {
                        return (
                            <div className="tasks__item tasks__item--indicated" key={date}>
                                <div className="tasks__date">{date}</div>
                                {tasks.map(task => {
                                    if (task.active === true && task.completionDate === date) {
                                        return <TasksListItem key={task.id}
                                                    task={task}
                                                    completeTask={completeTask}
                                                    removeTask={removeTask}/>
                                    } else {
                                        return null;
                                    }
                                })}
                                {tasks.map(task => {
                                    if (!!task.subtasks) {
                                        const filteredTask = filterActiveSubtasks(task);
                                        const subtaskArray = Object.keys(filteredTask.subtasks).map(key => filteredTask.subtasks[key]);

                                        return subtaskArray.map(subtask => {
                                            if (subtask.completionDate === date) {
                                                return <TasksListItem key={subtask.id}
                                                            task={subtask}
                                                            completeTask={completeTask}
                                                            removeTask={removeTask}/>
                                            } else {
                                                return null;
                                            }
                                        })
                                    } else {
                                        return null;
                                    }
                                })}
                                <AddTask display={display} openFunc={openFunc} closedFunc={closedFunc} setDate={setDate} date={date}/>
                            </div>
                        )
                    } else {
                        return (
                            <div className="tasks__item" key={date}>
                                <div className="tasks__date">
                                    {date}
                                    <AddTask display={display} openFunc={openFunc} closedFunc={closedFunc} setDate={setDate} date={date} outline/>
                                </div>
                            </div>
                        )
                    }
                })
            }
        </StyledUl>
    );
};

export default TasksList;