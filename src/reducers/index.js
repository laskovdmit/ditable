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
        default:
            return state;
    }
};

export default reducer;