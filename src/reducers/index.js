const initialState = {
    tasks: [],
    loading: true,
    error: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'TASKS_LOADED':
            return {
                ...state,
                tasks: action.preload,
                loading: false
            };
        case 'SHOW_LOADING': 
            return {
                ...state,
                loading: true
            };
        case 'HIDE_LOADING':
            return {
                ...state,
                loading: false
            };
        case 'SHOW_ERROR': 
            return {
                ...state,
                loading: false,
                error: true
            };
        case 'ADDED_NEW_TASK': 
            return {
                ...state,
                tasks: [
                    ...state.tasks,
                    action.preload
                ],
                loading: false
            };
        case 'DELETE_TASK':
            const taskId = action.preload;
            const taskIndex = state.tasks.findIndex(item => item.id === taskId);

            return {
                ...state,
                tasks: [
                    ...state.tasks.slice(0, taskIndex),
                    ...state.tasks.slice(taskIndex + 1)
                ],
                loading: false
            }
        default:
            return state;
    }
};

export default reducer;