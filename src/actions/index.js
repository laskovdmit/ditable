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

const showModalTask = (task) => {
    return {
        type: 'SHOW_MODAL_TASK',
        preload: task
    }
};

const closeModalTask = () => {
    document.body.style = '';

    return {
        type: 'CLOSE_MODAL_TASK',
    }
};

const showAddTaskModal = () => {
    return {
        type: 'SHOW_ADD_TASK_MODAL'
    }
};

const closeAddTaskModal = () => {
    document.body.style = '';

    return {
        type: 'CLOSE_ADD_TASK_MODAL'
    }
};

const showStatusMessage = (message) => {
    return {
        type: 'SHOW_STATUS_MESSAGE',
        preload: message
    }
};

const closeStatusMessage = (id) => {
    return {
        type: 'CLOSE_STATUS_MESSAGE',
        preload: id
    }
};

export {
    tasksLoaded,
    showLoading,
    showError,
    hideLoading,
    showModalTask,
    closeModalTask,
    showAddTaskModal,
    closeAddTaskModal,
    showStatusMessage,
    closeStatusMessage
};