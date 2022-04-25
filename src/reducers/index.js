const initialState = {
    tasks: [],
    selectedTask: {},
    modalTaskState: false,
    modalAddTaskState: false,
    statusMessageArray: [],
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
        case 'SHOW_MODAL_TASK':
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
        case 'SHOW_ADD_TASK_MODAL':
            return {
                ...state,
                modalAddTaskState: true
            };
        case 'CLOSE_ADD_TASK_MODAL':
            return {
                ...state,
                modalAddTaskState: false
            };
        case 'SHOW_STATUS_MESSAGE':
            return {
                ...state,
                statusMessageArray: [
                    ...state.statusMessageArray,
                    action.preload
                ]
            };
        case 'CLOSE_STATUS_MESSAGE':
            const id = action.preload;
            const itemIndex = state.statusMessageArray.findIndex(item => item.id === id);

            return {
                ...state,
                statusMessageArray: [
                    ...state.statusMessageArray.slice(0, itemIndex),
                    ...state.statusMessageArray.slice(itemIndex + 1)
                ]
            };
        default:
            return state;
    }
};

export default reducer;