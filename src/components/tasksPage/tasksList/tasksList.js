import React from "react";
import styled from 'styled-components';
import TasksListItem from "../tasksListItem/";
import { getZero } from "../../../services/ditableService";
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

const TasksList = ({tasks, display, closedFunc, setDate, period}) => {
    const today = Date.parse(new Date());
    const dateArray = getDateArray(today, period);
    const tasksDateArray = tasks.map(task => task.completionDate);

    return (
        <StyledUl>
            {
                dateArray.map(date => {
                    const matchesPresentDate = tasksDateArray.filter(taskDate => taskDate === date);
                    const isPresentDateMatch = matchesPresentDate.length !== 0 ? true : false;

                    if (isPresentDateMatch) {
                        return (
                            <div className="tasks__item tasks__item--indicated" key={date}>
                                <div className="tasks__date">{date}</div>
                                {tasks.map(task => {
                                    if (task.completionDate === date) {
                                        return <TasksListItem key={task.id} task={task}/>
                                    }
                                })}
                                <AddTask display={display} toggleFunc={closedFunc} setDate={setDate} date={date}/>
                            </div>
                        )
                    } else {
                        return (
                            <div className="tasks__item" key={date}>
                                <div className="tasks__date">
                                    {date}
                                    <AddTask display={display} toggleFunc={closedFunc} setDate={setDate} date={date} outline/>
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