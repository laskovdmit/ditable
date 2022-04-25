const getZero = (num) => num < 10 ? `0${num}` : num;

const getColor = (priority) => {
    switch (priority) {
        case '5':
            return '#8B0000';
        case '4':
            return '#DC143C';
        case '3':
            return '#FF4500';
        case '2':
            return '#FFA500';
        default:
            return '#FA8072';
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

export {
    getZero,
    getColor,
    getCalendarDate,
    getTextPriority,
    getPostingDate,
    filterActiveSubtasks
}