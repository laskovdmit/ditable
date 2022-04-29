import React from "react";
import styled from 'styled-components';
import TasksListItem from "../tasksListItem/";
import { getZero, filterActiveSubtasks } from "../../../services/ditableService";
import AddTask from "../addTask";
import { sortTasks, getTextDay } from "../../../services/ditableService";

const StyledUl = styled.ul`
    width: 700px;
    margin: 0 auto;
    padding: 0;
    padding-top: 20px;

    position: relative;
    display: flex;
    flex-direction: column;

    .tasks__addItem {
        display: none;
    }

    .tasks__month {
        font-size: 30px;
        font-weight: bold;
        /* text-align: center; */
        padding: 10px;
        padding-left: 20px;
        margin-bottom: 10px;

        /* border-bottom: 1px solid #999; */
        /* box-shadow: 5px 5px 5px 0 #999; */
    }

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
    }

    .tasks__item {
        margin-bottom: 10px;

        &--indicated {
            margin-bottom: 50px;

            .tasks__date {
                padding: 10px 20px;
                border-bottom: 1px solid #aaa;

                cursor: default;

                &:hover .tasks__addItem {
                    color: #333;
                }

                & p {
                    font-size: 24px;
                    font-weight: bold;
                    text-align: center;

                    background-color: #fff;
                    z-index: 2;
                }
            }
        }
    }
`;

const getDateArray = (date, daysCount) => {
    const oneDay = 86400000;
    let dateArr = [];

    for (let i = 0; i < daysCount; i++) {
        const newDate = new Date(date + oneDay * i);
        const newDateString = `${getZero(newDate.getDate())}.${getZero(newDate.getMonth() + 1)}.${newDate.getFullYear()}`;
        dateArr.push({ date: newDateString, parsedDate: newDate});
    }

    return dateArr;
};

const TasksList = ({tasks, openFunc, setDate, period, completeTask, removeTask, today}) => {
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
                dateArray.map(obj => {
                    const matchesDate = tasksDateArray.filter(taskDate => taskDate === obj.date);
                    const isDateMatch = matchesDate.length !== 0 ? true : false;
                    const dayWeek = getTextDay(obj.parsedDate);
                    let subtaskArray = [];
                    let currentMonth = (
                        <div className="tasks__month" data-month={obj.parsedDate.getMonth()}>
                            {obj.parsedDate.toLocaleString('default', { month: 'long' }).toUpperCase()}
                        </div>
                    );
                    
                    const isNextMonth = obj.parsedDate.getDate() === 1;


                    if (isDateMatch) {
                        return (
                            <React.Fragment key={obj.date}>
                                {isNextMonth && currentMonth}
                                <div className="tasks__item tasks__item--indicated">
                                    <div className="tasks__date">
                                        <p>{obj.date} • {dayWeek}</p>
                                        <AddTask
                                            openFunc={openFunc}
                                            setDate={setDate}
                                            date={obj.date}
                                            type={"outline"}/>
                                    </div>
                                    {tasksArr.map(task => {
                                        for (let key in task.subtasks) {
                                            subtaskArray.push(task.subtasks[key]); 
                                        }

                                        if (task.completionDate === obj.date) {

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
                                            if (subtask.completionDate === obj.date) {
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
                                </div>
                            </React.Fragment>
                        )
                    } else {
                        return (
                            <React.Fragment key={obj.date}>
                                {isNextMonth && currentMonth}
                                <div className="tasks__item">
                                    <div className="tasks__date">
                                        {obj.date} • {dayWeek}
                                        <AddTask
                                            openFunc={openFunc}
                                            setDate={setDate}
                                            date={obj.date}
                                            type={"outline"}/>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    }
                })
            }
        </StyledUl>
    );
};

export default TasksList;