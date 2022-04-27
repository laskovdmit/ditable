import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import nextId from 'react-id-generator';
import PriorityItem from '../../../priorityItem';
import SelectPriorityItem from '../../../priorityItem/selectPriorityItem';
import { getTextPriority, getCalendarDate } from '../../../../services/ditableService';
import { showStatusMessage } from '../../../../actions/';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    margin-bottom: 10px;

    .addsub__title {
        width: 100%;
        height: 40px;
        margin-bottom: 10px;
        padding: 5px 10px;

        border: 1px solid #777;
        border-radius: 5px;
    }

    .addsub__descr {
        width: 100%;
        height: 100px;
        padding: 10px;
        margin-bottom: 10px;
        
        border: 1px solid #777;
        border-radius: 5px;
        resize: none;
    }
    
    .addsub__date {
        width: 150px;
        height: 42px;
        padding: 5px 10px;
        margin-right: 10px;
        
        border: 1px solid #777;
        border-radius: 5px;
    }

    .addsub__btn {
        width: 150px;
        height: 40px;
        padding: 5px 10px;
        
        color: #fff;
        cursor: pointer;

        background-color: #00CC00;
        border: none;
        border-radius: 7px;

        :hover {
            background-color: #45E645;
        }

        :active  {
            background-color: #67E667;
        }
    }

    .addsub__flex {
        display: flex;
        margin-bottom: 10px;
    }

    .addsub__wrap {
        display: flex;
        flex-direction: column;
        flex-basis: 50%;
    }

    .addsub__select {
        width: 200px;
        height: 42px;
        border: 1px solid #777;
        border-radius: 5px;
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

        &.open {
            border-radius: 5px 5px 0 0;
        }

        &.open::after {
            transform: rotate(135deg);
        }

        &.open::before {
            transform: rotate(45deg);
        }
    }
`;

const AddSubtasksItem = ({display, postData, setDisplay, showStatusMessage, choosenDate}) => {
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

    const onSubmitForm = (e) => {
        e.preventDefault();

        if (title === "") {
            showStatusMessage({
                id: nextId('dfhf'),
                title: "Ошибка",
                description: "Название подзадачи не может быть пустым"
            });
            return;
        }

        if (date === "") {
            showStatusMessage({
                id: nextId('trhd'),
                title: "Ошибка",
                description: "Необходимо выбрать дату выполнения подзадачи"
            });
            return;
        }

        postData(e, {
            title,
            descr,
            date,
            priority
        });
        setDisplay(!display);
    };

    return (
        <StyledForm onSubmit={onSubmitForm}>
            <input className="addsub__title" type="text" placeholder="Введите название подзадачи"
                value={title}
                onInput={(e) => setTitle(e.target.value)}/>
            <textarea className="addsub__descr" type="text" placeholder="Введите описание подзадачи"
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
                    <SelectPriorityItem
                        setPriority={setPriority}
                        display={priorityDisplay}
                        setDisplay={setPriorityDisplay}/>
                </div>
            </div>
            <button className="addsub__btn" type="submit">Добавить</button>
        </StyledForm>
    );
};

export default AddSubtasksItem;