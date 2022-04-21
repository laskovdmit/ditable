const initialState = {
    tasks: [],
    selectedTask: {},
    modalTaskState: false,
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
        case 'SHOW_CURRENT_TASK':
            return {
                ...state,
                selectedTask: action.preload,
                modalTaskState: true
            };
        case 'CLOSE_MODAL_TASK':
            return {
                ...state,
                selectedTask: {},
                modalTaskState: false
            };
        default:
            return state;
    }
};

export default reducer;