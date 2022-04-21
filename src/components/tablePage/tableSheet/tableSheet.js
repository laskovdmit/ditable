import React from 'react';
import styled from 'styled-components';
import { getZero } from '../../../services/ditableService';

const StyledTableSheet = styled.table`
    border-collapse: collapse;
    background-color: #fff;
    border: 2px solid #000;
    flex-grow: 1;

    th, td {
        min-width: 200px;
        padding: 5px 10px;
        border: 1px solid #999;

        div {
            min-height: 20px;
        }
    }
`;

const TableSheet = ({columnCount, tasks}) => {

    const setRowData = (columns, task) => {

        return columns.map(date => {
            let data = '';

            if (task.completionDate === date) {
                data = task.title;
            }

            return (
                <td key={`cell-${date}`}>
                    <div>
                        {data}
                    </div>
                </td>
            );
        });
    };

    const setColumns = (count = columnCount, tasks) => {
        const date = new Date();
        const columns = [];

        for (let i = 1; i <= count; i++) {
            columns.push(`${getZero(date.getDate() + i)}.${getZero((date.getMonth() + 1))}.${getZero(date.getFullYear())}`);
        }

        return (
            <>
                <thead>
                    <tr>
                        <th>Название задачи</th>
                        {columns.map(date => {
                            return (
                                <td key={`head-${date}`}>
                                    <div>
                                        {date}
                                    </div>
                                </td>
                            );
                        })}
                    </tr>
                </thead>
                <tbody>
                    {tasks.map((task, i) => {
                        return (
                            <tr key={`task-${i}`} data-task={`${i + 1}`}>
                                <th>{task.title}</th>
                                {setRowData(columns, task)}
                            </tr>
                        );
                    })}
                </tbody>
            </>
        );
    }

    return (
        <StyledTableSheet>
            {setColumns(columnCount, tasks)}
        </StyledTableSheet>
    );
};

export default TableSheet;