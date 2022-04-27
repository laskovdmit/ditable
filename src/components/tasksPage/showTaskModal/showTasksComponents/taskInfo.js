import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import PriorityItem from '../../../priorityItem';
import SelectPriorityItem from '../../../priorityItem/selectPriorityItem';
import { getColor, getCalendarDate } from '../../../../services/ditableService';

const StyledForm = styled.form`
    padding-bottom: 10px;
    margin-bottom: 10px;

    .form__header, .form__footer {
        display: flex;
        align-items: center;
    }

    .form__priority {
        position: relative;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 7px;

        display: flex;
        justify-content: center;
        align-items: center;
        
        &:hover {
            background-color: #ededed;
        }

        &.open {
            border-radius: 7px 7px 0 0;
        }
    }

    .form__input {
        width: 100%;
        padding: 10px;
        border: none;
        border-radius: 7px;

        &::placeholder {
            color: #333;
        }
        
        &:hover {
            background-color: #ededed;
            cursor: pointer;
        }

        &:focus {
            cursor: text;
        }
    }

    .form__title {
        margin-left: 10px;

        color: #000;
        font-size: 20px;
        font-weight: bold;
    }

    .form__descr {
        margin-bottom: 10px;
        resize: none;
    }

    .form__footer {
        justify-content: space-between;
        height: 40px;

        .form__btns {
            display: ${props => props.btnDisplay ? 'flex' : 'none'};
        }
    }

    .form__completionDate {
        padding: 5px 10px;
        cursor: pointer;

        color: #fff;
        background-color: ${props => props.color};

        border: 1px solid ${props => props.color};
        border-radius: 7px;
    }

    .form__btn {
        height: 40px;
        padding: 5px 10px;
        
        color: #fff;
        font-weight: bold;
        cursor: pointer;

        border: none;
        border-radius: 7px;

        &--cancel {
            width: 120px;
            margin-right: 20px;
            border: 2px solid #d6d6d6;
            background-color: inherit;

            color: rgba(0, 0, 0, .88);

            :hover {
                background-color: #e6e6e6;
            }

            :active  {
                background-color: #efefef;
            }
        }
        
        &--submit {
            width: 150px;
            background-color: #00CC00;

            :hover {
                background-color: #45E645;
            }

            :active  {
                background-color: #67E667;
            }
        }
    }

    .form__addDescr {
        background-color: inherit;
        margin-bottom: 10px;
        border: none;
        cursor: pointer;

        color: #666;
    }
`;

const TaskInfo = ({task, postData, display}) => {
    const {title, description, completionDate, priority} = task;
    const color = getColor(priority);
    
    const [newTitle, setTitle] = useState('');
    const [newDescr, setDescr] = useState('');
    const [newDate, setDate] = useState('');
    const [btnDisplay, setBtnDisplay] = useState(false);
    const [newPriority, setPriority] = useState('1');
    const [priorityDisplay, setPriorityDisplay] = useState(false);

    useEffect(() => {
        if (display) {
            title && setTitle(title);
            description && setDescr(description);
            completionDate && setDate(getCalendarDate(completionDate));
            priority && setPriority(priority);
        } else {
            setTitle('');
            setDescr('');
            setDate('');
            setPriority('1');
        }
    }, [display, title, description, completionDate, priority]);

    useEffect(() => {
        if ((title !== newTitle || description !== newDescr || getCalendarDate(completionDate) !== newDate || newPriority !== priority) && 
            (newTitle !== '' || newDescr !== '' || newDate !== '')) {
            setBtnDisplay(true);
        } else {
            setBtnDisplay(false);
        }

    }, [display, title, newTitle, description, newDescr, completionDate, newDate, newPriority, priority]);
    
    const resetData = () => {
        setTitle(title);
        setDescr(description);
        setDate(getCalendarDate(completionDate));
        setPriority(priority);
    };

    return (
        <StyledForm color={color.main} btnDisplay={btnDisplay} onSubmit={(e) => postData(e, {
            newTitle,
            newDescr,
            newDate,
            newPriority
        })}>
            <div className="form__header">
                <div>
                    <div className={priorityDisplay ? "form__priority open" : "form__priority"} onClick={() => setPriorityDisplay(!priorityDisplay)}>
                        <PriorityItem priority={newPriority}/>
                        <SelectPriorityItem
                            setPriority={setPriority}
                            display={priorityDisplay}
                            setDisplay={setPriorityDisplay}
                            top="-1"
                            left="1"/>
                    </div>
                    </div>
                <input className="form__title form__input" type="text" value={newTitle}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={(e) => e.target.value === "" && setTitle(title)}/>
            </div>
            <textarea className="form__descr form__input" type="text" value={newDescr}
                onChange={(e) => setDescr(e.target.value)}
                placeholder={description ? "" : "+ Добавить описание"}/>
            <div className="form__footer">
                <input className="form__completionDate" type="date"
                    value={newDate}
                    onChange={(e) => setDate(e.target.value)}/>
                <div className="form__btns">
                    <button className="form__btn form__btn--cancel" type="button"
                        onClick={resetData}>Отмена</button>
                    <button className="form__btn form__btn--submit" type="submit">Сохранить</button>
                </div>
            </div>
        </StyledForm>
    );
};

export default TaskInfo;