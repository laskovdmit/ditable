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

const getTextDay = (parseDate) => {
    const today = new Date();
    const dayWeek = new Date(parseDate);

    if (today.getMonth() === dayWeek.getMonth() &&
        today.getFullYear() === dayWeek.getFullYear()) {

        if (today.getDate() === dayWeek.getDate()) {
            return 'Сегодня';
        }

        if (today.getDate() + 1 === dayWeek.getDate()) {
            return 'Завтра';
        }

        if (today.getDate() - 1 === dayWeek.getDate()) {
            return 'Вчера';
        }
    }

    switch (dayWeek.getDay()) {
        case 0: 
            return "Воскресенье";
        case 1: 
            return "Понедельник";
        case 2: 
            return "Вторник";
        case 3: 
            return "Среда";
        case 4: 
            return "Четверг";
        case 5: 
            return "Пятница";
        case 6: 
            return "Суббота";
        default:
            return; 
    }
}

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

const getScrollWidth = () => {
    const div = document.createElement('div');

    div.style.width = '50px';
    div.style.height = '50px';
    div.style.overflowY ='scroll';
    div.style.visibility = 'hidden';

    document.body.appendChild(div);
    let scrollWidth = div.offsetWidth - div.clientWidth;
    div.remove();

    return scrollWidth;
};

export {
    getZero,
    getColor,
    getCalendarDate,
    getTextPriority,
    getPostingDate,
    filterActiveSubtasks,
    sortTasks,
    getTextDay,
    getScrollWidth
}