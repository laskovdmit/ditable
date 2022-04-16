import React from 'react';
import styled from 'styled-components';

const StyledTableSheet = styled.table`
    border-collapse: collapse;

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

    const setRowData = (count = columnCount, date, tasks) => {
        // const rowCount = tasks.length;
        // const columns = [];

        // for (let i = 1; i <= count; i++) {
        //     columns.push(`Задача ${i}`);
        // }

        return tasks.map((task, i) => {
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
            columns.push(`${date.getDate() + i}.${date.getMonth() + 1}.${date.getFullYear()}`);
        }

        return (
            <>
                <thead>
                    <tr>
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
                                {/* {setRowData(count, columns[], task)} */}
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