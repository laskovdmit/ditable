import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PriorityItem from '../../../priorityItem';
import SelectPriorityItem from '../../../priorityItem/selectPriorityItem';
import { getTextPriority, getCalendarDate } from '../../../../services/ditableService';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    padding-top: 15px;
    padding-bottom: 10px;

    .addsub__title {
        width: 400px;
        height: 40px;
        margin-bottom: 15px;
        padding: 5px 10px;

        border: 1px solid #000;
        border-radius: 3px;
    }

    .addsub__descr {
        width: 400px;
        height: 100px;
        padding: 10px;
        margin-bottom: 15px;
        
        border: 1px solid #000;
        border-radius: 3px;
        resize: none;
    }
    
    .addsub__date {
        width: 150px;
        height: 42px;
        padding: 5px 10px;
        margin-bottom: 15px;
        margin-right: 15px;
        
        border: 1px solid #000;
        border-radius: 3px;
    }

    .addsub__btn {
        width: 150px;
        height: 40px;
        padding: 5px 10px;
        
        color: #fff;
        cursor: pointer;

        background-color: #DC143C;
        border: none;
        border-radius: 3px;

        :hover {
            background-color: #ed3e61;
        }

        :active  {
            background-color: #f299ab;
        }
    }

    .addsub__flex {
        display: flex;
    }

    .addsub__wrap {
        display: flex;
        flex-direction: column;
        flex-basis: 50%;
    }

    .addsub__select {
        width: 200px;
        height: 42px;
        border: 1px solid #000;
        border-radius: 3px;
        padding: 5px;
        padding-right: 30px;

        position: relative;
        cursor: pointer;

        display: flex;
        align-items: center;

        p {
            margin-left: 10px;
        }

        &::after, &::before {
            content: "";
            position: absolute;
            top: 20px;

            width: 10px;
            height: 2px;

            background-color: #000;
            transition: .2s ease-in;
        }

        &::after {
            right: 11px;
            transform: rotate(45deg);
        }

        &::before {
            right: 5px;
            transform: rotate(-45deg);
        }

        &.open::after {
            transform: rotate(135deg);
        }

        &.open::before {
            transform: rotate(45deg);
        }
    }
`;

const AddSubtasksItem = ({display, postData, setDisplay, choosenDate}) => {
    const [title, setTitle] = useState('');
    const [descr, setDescr] = useState('');
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState('1');
    const [priorityDisplay, setPriorityDisplay] = useState(false);

    useEffect(() => {
        if (choosenDate) {
            setDate(getCalendarDate(choosenDate));
        }
    }, [choosenDate]);

    if (!display) {
        return null;
    }

    return (
        <StyledForm onSubmit={(e) => {
            postData(e, {
                title,
                descr,
                date,
                priority
            });
            setDisplay(!display);
        }}>
            <input className="addsub__title" type="text" placeholder="Введите название задачи"
                value={title}
                onInput={(e) => setTitle(e.target.value)}/>
            <textarea className="addsub__descr" type="text" placeholder="Введите описание задачи"
                value={descr}
                onInput={(e) => setDescr(e.target.value)}></textarea>
            <div className="addsub__flex">
                <input id="addsub__date" className="addsub__date" type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}/>
                <div className={priorityDisplay ? "addsub__select open" : "addsub__select"}
                    onClick={() => setPriorityDisplay(!priorityDisplay)}>
                    <PriorityItem priority={priority}/>
                    <p>{getTextPriority(priority)}</p>
                </div>
                <SelectPriorityItem
                    setPriority={setPriority}
                    display={priorityDisplay}
                    setDisplay={setPriorityDisplay}
                    top={-1}/>
            </div>
            <button className="addsub__btn" type="submit">Добавить</button>
        </StyledForm>
    );
};

export default AddSubtasksItem;