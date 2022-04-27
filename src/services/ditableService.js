const getZero = (num) => num < 10 ? `0${num}` : num;

const getColor = (priority) => {
    switch (priority) {
        case '5':
            return {
                main: '#8B0000',
                hover: '#C53131',
                active: '#C55959'
            };
        case '4':
            return {
                main: '#DC143C',
                hover: '#EE4C6B',
                active: '#EE778E'
            };
        case '3':
            return {
                main: '#FF4500',
                hover: '#FF7340',
                active: '#FF9973'
            };
        case '2':
            return {
                main: '#FFA500',
                hover: '#FFBC40',
                active: '#FFCE73'
            };
        default:
            return {
                main: '#FA8072',
                hover: '#FD9F95',
                active: '#FDB8B1'
            };
    }
};

const getCalendarDate = (date) => {
    return `${date.slice(6)}-${date.slice(3, 5)}-${date.slice(0, 2)}`;
};

const getPostingDate = (date) => {
    return `${getZero(date.getDate())}.${getZero(date.getMonth() + 1)}.${date.getFullYear()}`;
};

const getTextPriority = (priority) => {
    switch (priority) {
        case '5':
            return 'Очень высокий';
        case '4':
            return 'Высокий';
        case '3':
            return 'Средний';
        case '2':
            return 'Ниже среднего';
        default:
            return 'Низкий';
    }
};

const filterActiveSubtasks = (task) => {
    if (!!task.subtasks) {
        const subtasks = Object.keys(task.subtasks).map(key => task.subtasks[key]);
        const filterSubtasks = subtasks.filter(subtask => subtask.active === true);
        return {
            ...task,
            subtasks: filterSubtasks
        }
    } else {
        return task;
    }
};

const sortTasks = (tasks) => {
    let arr = tasks;

    if (!Array.isArray(tasks)) {
        arr = Object.keys(tasks).map(key => tasks[key]);
    }
    
    arr = arr.filter(task => task.active === true);
    arr.sort((a, b) => {
        if (+a.priority < +b.priority) {
            return 1;
        }
        if (+a.priority > +b.priority) {
            return -1;
        }
        return 0;
    });

    return arr;
}

export {
    getZero,
    getColor,
    getCalendarDate,
    getTextPriority,
    getPostingDate,
    filterActiveSubtasks,
    sortTasks
}