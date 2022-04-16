import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import nextId from 'react-id-generator';
import { connect } from 'react-redux';
import ModalWrap from '../../modalWrap';
import { FirebaseServiceContext } from '../../serviceContext/serviceContext';
import { showLoading, showError } from '../../../actions/';

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
`;

const AddTaskModal = ({showLoading, showError, loading, error, display, closedFunc, ...props}) => {
    const firebaseService = useContext(FirebaseServiceContext);
    const [title, setTitle] = useState('');
    const [descr, setDescr] = useState('');
    const [date, setDate] = useState('');
    const [priority, setPriority] = useState('1');

    const onSubmitForm = (e) => {
        e.preventDefault();
        showLoading();

        const today = new Date();
        const currentDate = `${today.getDate()}.${today.getMonth() + 1}.${today.getFullYear()}`;
        const completionDate = `${date.slice(8, 10)}.${date.slice(5, 7)}.${date.slice(0, 4)}`;

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
                <input className="task__title" name="title" type="text" placeholder="Введите название задачи"
                    value={title}
                    onInput={(e) => setTitle(e.target.value)}/>
                <textarea className="task__descr" name="description" type="text" placeholder="Введите описание задачи"
                    value={descr}
                    onInput={(e) => setDescr(e.target.value)}></textarea>
                <div className="task__flex">
                    <div className="task__wrap">
                        <label htmlFor="task__date">Выполнить до:</label>
                        <input id="task__date" className="task__date" name="completionDate" type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}/>
                    </div>
                    <div className="task__wrap">
                        <label htmlFor="task__priority">Приоритет:</label>
                        <select id="task__priority" className="task__priority" name="priority"
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}>
                            <option value="5">Очень высокий</option>
                            <option value="4">Высокий</option>
                            <option value="3">Средний</option>
                            <option value="2">Ниже среднего</option>
                            <option value="1">Низкий</option>
                        </select>
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