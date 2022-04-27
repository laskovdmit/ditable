import React from "react";
import styled from 'styled-components';
import TasksListItem from "../tasksListItem/";
import { getZero, filterActiveSubtasks } from "../../../services/ditableService";
import AddTask from "../addTask";
import { sortTasks } from "../../../services/ditableService";

const StyledUl = styled.ul`
    width: 700px;
    margin: 0 auto;
    padding: 0;
    padding-top: 20px;

    position: relative;
    display: flex;
    flex-direction: column;
    
    /* border-left: 1px solid #999; */

    .tasks__addItem {
        display: none;
    }

    /* &::before {
        content: "";

        position: absolute;
        top: -5px;
        left: -5px;

        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #999;
    } */

    .tasks__date {
        position: relative;
        cursor: pointer;

        display: flex;
        align-items: center;

        min-height: 31px;
        padding: 5px 20px;
        
        font-weight: 300;

        &:hover .tasks__addItem {
            display: block;
        }

        /* &::before {
            content: "";

            position: absolute;
            top: 50%;
            left: 0;

            width: 15px;
            height: 1px;
            background-color: #999;
        } */
    }

    .tasks__item {
        margin-bottom: 10px;

        &--indicated {
            margin-bottom: 50px;

            .tasks__date {
                padding: 10px 20px;
                justify-content: center;
                border-bottom: 1px solid #aaa;

                cursor: default;

                & p {
                    font-size: 20px;
                    font-weight: bold;
                    text-align: center;

                    background-color: #fff;
                    padding: 0 30px;
                    z-index: 2;
                }

                /* &::before {
                    content: "";

                    position: absolute;
                    top: 50%;
                    left: 0;

                    width: 100%;
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
                } */
            }
        }
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

const TasksList = ({tasks, openFunc, setDate, period, completeTask, removeTask}) => {
    const today = Date.parse(new Date());
    const dateArray = getDateArray(today, period);
    const tasksDateArray = [];
    const tasksArr = sortTasks(tasks);

    tasksArr.forEach(task => {
        tasksDateArray.push(task.completionDate);
        
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
                    let subtaskArray = [];

                    if (isDateMatch) {
                        return (
                            <div className="tasks__item tasks__item--indicated" key={date}>
                                <div className="tasks__date"><p>{date}</p></div>
                                {tasksArr.map(task => {
                                    for (let key in task.subtasks) {
                                        subtaskArray.push(task.subtasks[key]); 
                                    }

                                    if (task.completionDate === date) {

                                        return <TasksListItem
                                                    key={task.id}
                                                    task={task}
                                                    completeTask={completeTask}
                                                    removeTask={removeTask}
                                                    type={'task'}/>
                                    } else {
                                        return null;
                                    }
                                })}
                                {sortTasks(subtaskArray).map(subtask => {
                                        if (subtask.completionDate === date) {
                                            return <TasksListItem
                                                        key={subtask.id}
                                                        task={subtask}
                                                        completeTask={completeTask}
                                                        removeTask={removeTask}
                                                        type={'subtask'}/>
                                        } else {
                                            return null;
                                        }
                                    })
                                }
                                <AddTask
                                    openFunc={openFunc}
                                    setDate={setDate}
                                    date={date}/>
                            </div>
                        )
                    } else {
                        return (
                            <div className="tasks__item" key={date}>
                                <div className="tasks__date">
                                    {date}
                                    <AddTask
                                        openFunc={openFunc}
                                        setDate={setDate}
                                        date={date}
                                        type={"outline"}/>
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