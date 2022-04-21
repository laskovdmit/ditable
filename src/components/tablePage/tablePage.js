import React, { useEffect, useContext, useState } from "react";
import { connect } from "react-redux";
import styled from 'styled-components';
import { showLoading, showError, tasksLoaded } from '../../actions';
import { FirebaseServiceContext } from '../serviceContext/serviceContext';
import Spinner from '../spinner';
import Error from '../error';
import TableSheet from "./tableSheet";

const StyledTablePage = styled.div`
    flex-grow: 1;
    height: 85vh;
    padding: 20px;

    overflow-x: scroll;
    background-color: #64A8D1;

    .table__wrap {
        margin-bottom: 20px;
        margin-top: 5px;
        display: flex;
        align-items: center ;
    }

    .table__input {
        height: 30px;
        padding: 0 10px;
    }

    .table__btn {
        padding: 5px 10px;
        background-color: #fff;
        border: 1px solid #999;
        border-radius: 3px;
    }
`;

const TablePage = ({tasks, loading, error, showLoading, showError, tasksLoaded}) => {
    const firebaseService = useContext(FirebaseServiceContext);
    const [dayCount, setDayCount] = useState(7);
    const [columnCount, setColumnCount] = useState(7);
    
    useEffect(() => {
        showLoading();
            
        firebaseService.listenChangingData('tasks/', (newData) => {
            tasksLoaded(newData);
        }, showError);
    }, []);

    if (error) {
        return <Error/>
    }

    if (loading) {
        return <Spinner/>
    }

    return (
        <StyledTablePage>
            <h1>Таблица задач</h1>
            <label className="table__label" htmlFor="dayCount">Количество дней для отображения:</label>
            <div className="table__wrap">
                <input className="table__input" id="dayCount" type="number"
                    placeholder={dayCount}
                    value={dayCount}
                    onInput={(e) => setDayCount(e.target.value)}/>
                <button className="table__btn"
                    onClick={() => setColumnCount(dayCount)}>Установить</button>
            </div>
            <TableSheet columnCount={columnCount} tasks={tasks}/>
        </StyledTablePage>
    );
};

const mapStateToProps = (state) => {
    return {
        tasks: state.tasks,
        loading: state.loading,
        error: state.error
    }
};

const mapDispatchToProps = {
    tasksLoaded,
    showLoading,
    showError
};

export default connect(mapStateToProps, mapDispatchToProps)(TablePage)