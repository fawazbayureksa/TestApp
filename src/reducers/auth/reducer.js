const initialState = {
    isLogin: false,
    token: null,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case "DO_LOGIN":
            return {
                ...state,
                isLogin: true,
                token: action.payload,
            };
        case "DO_LOGOUT":
            return {
                ...state,
                isLogin: false,
                token: null,
            };
        default:
            return state;
    }
};