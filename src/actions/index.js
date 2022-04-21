const tasksLoaded = (tasks) => {
    return {
        preload: tasks,
        type: 'TASKS_LOADED'
    }
};

const showLoading = () => {
    return {
        type: 'SHOW_LOADING'
    }
};

const hideLoading = () => {
    return {
        type: 'HIDE_LOADING'
    }
};

const showError = () => {
    return {
        type: 'SHOW_ERROR'
    }
};

const showCurrentTask = (task) => {
    return {
        type: 'SHOW_CURRENT_TASK',
        preload: task
    }
};

const closeModalTask = (task) => {
    return {
        type: 'CLOSE_MODAL_TASK',
    }
};

export {
    tasksLoaded,
    showLoading,
    showError,
    hideLoading,
    showCurrentTask,
    closeModalTask
};