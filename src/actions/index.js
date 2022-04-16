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

export {
    tasksLoaded,
    showLoading,
    showError,
    hideLoading
};