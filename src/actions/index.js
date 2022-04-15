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

const addedNewTask = (task) => {
    return {
        preload: task,
        type: 'ADDED_NEW_TASK'
    }
};

const uploadNewTask = () => {
    return {
        type: 'UPLOAD_NEW_TASK'
    }
};

const failedUploadNewTask = () => {
    return {
        type: 'FAILED_UPLOAD_NEW_TASK'
    }
};

const deleteTask = (id) => {
    return {
        type: 'DELETE_TASK',
        preload: id
    }
};

export {
    tasksLoaded,
    showLoading,
    showError,
    addedNewTask,
    uploadNewTask,
    failedUploadNewTask,
    deleteTask,
    hideLoading
};