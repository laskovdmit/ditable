import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import nextId from 'react-id-generator';
import { connect } from 'react-redux';
import ModalWrap from '../../modalWrap';
import { FirebaseServiceContext } from '../../serviceContext/serviceContext';
import { showLoading, showError } from '../../../actions/';
import { getZero } from '../../../services/ditableService';
import PriorityItem from '../../priorityItem/';
import SelectPriorityItem from '../../priorityItem/selectPriorityItem';
import { getTextPriority } from '../../../services/ditableService';

const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .task__title {
        width: 400px;
        height: 40px;
        margin-bottom: 15px;
        padding: 5px 10px;

        border: 1px solid #000;
        border-radius: 3px;
    }

    .task__descr {
        width: 400px;
        height: 100px;
        padding: 10px;
        margin-bottom: 15px;
        
        border: 1px solid #000;
        border-radius: 3px;
        resize: none;
    }
    
    .task__date, .task__priority {
        width: 150px;
        height: 40px;
        padding: 5px 10px;
        margin-bottom: 15px;
        margin-right: 15px;
        
        border: 1px solid #000;
        border-radius: 3px;
    }

    .task__priority {
        width: 250px;

        option {
            display: block;
            height: 40px;
        }
    }

    .task__btn {
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

    .task__flex {
        display: flex;
    }

    .task__wrap {
        display: flex;
        flex-direction: column;
        flex-basis: 50%;
    }

    .task__select {
        width: 200px;
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

const AddTaskModal = ({choosenDate, showLoading, showError, error, display, closedFunc, ...props}) => {
    const firebaseService = useContext(FirebaseServiceContext);
    const [title, setTitle] = useState('');
    const [descr, setDescr] = useState('');
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState('1');
    const [priorityDisplay, setPriorityDisplay] = useState(false);

    useEffect(() => {
        if (choosenDate) {
            setDate(`${choosenDate.slice(6)}-${choosenDate.slice(3, 5)}-${choosenDate.slice(0, 2)}`);
        }
    }, [choosenDate]);


    const onSubmitForm = (e) => {
        e.preventDefault();
        showLoading();

        const today = new Date();
        const currentDate = `${getZero(today.getDate())}.${getZero(today.getMonth() + 1)}.${today.getFullYear()}`;

        const parseDate = new Date(Date.parse(date));
        const completionDate = `${getZero(parseDate.getDate())}.${getZero(parseDate.getMonth() + 1)}.${parseDate.getFullYear()}`;

        const newTask = {
            id: nextId() + Math.floor(Math.random() * 100000),
            title: title,
            description: descr,
            creationDate: currentDate,
            completionDate: completionDate,
            priority: priority
        };

        firebaseService.postData('tasks/' + newTask.id, newTask, showError);
        setTitle('');
        setDescr('');
        setDate('');
        setPriority('1');
        closedFunc();
    };

    if (error) {
        closedFunc(false);
    }

    return (
        <ModalWrap {...props} closedFunc={closedFunc} display={display} width={'500px'} height={'410px'}>
            <h2>Добавить новую задачу</h2>
            <StyledForm onSubmit={onSubmitForm}>
                <input className="task__title" type="text" placeholder="Введите название задачи"
                    value={title}
                    onInput={(e) => setTitle(e.target.value)}/>
                <textarea className="task__descr" type="text" placeholder="Введите описание задачи"
                    value={descr}
                    onInput={(e) => setDescr(e.target.value)}></textarea>
                <div className="task__flex">
                    <div className="task__wrap">
                        <label htmlFor="task__date">Выполнить до:</label>
                        <input id="task__date" className="task__date" type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}/>
                    </div>
                    <div className="task__wrap">
                        <label htmlFor="task__priority">Приоритет:</label>
                        <div className={priorityDisplay ? "task__select open" : "task__select"}
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
                </div>
                <button className="task__btn" type="submit">Отправить</button>
            </StyledForm>
        </ModalWrap>
    );
};

const mapStateToProps = (state) => {
    return {
        error: state.error
    }
};

const mapDispatchToProps = {
    showLoading,
    showError
};

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskModal);