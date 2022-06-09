import axios from "axios";

const baseUrl = `https://api-cms.degadai.id/api/`;

export const getUsers = () => {
    return async (dispatch) => {
        dispatch({
            type: "GET_USER_REQUEST",
        });
        try {
            const result = await axios.get(baseUrl + `/users`);
            dispatch({
                type: "GET_USER_DONE",
                payload: result.data,
            });
        } catch (error) {
            dispatch({
                type: "GET_USER_ERROR",
            });
        }
    };
};

export const createUser = (data) => {
    return async (dispatch) => {
        try {
            const result = await axios.post(baseUrl + `/users`, data);
            return result;
        } catch (error) {
            dispatch({
                type: "GET_USER_ERROR",
            });
        }
    };
};

export const loginUser = (data) => {
    return async (dispatch) => {
        try {
            const result = await axios.post(baseUrl + `/users/login`, data);
            dispatch({
                type: "DO_LOGIN",
                payload: result.data.token,
            });
            return result;
        } catch (error) {
            return 500;
        }
    };
};

export const logoutUser = () => {
    return (dispatch) => {
        try {
            dispatch({
                type: "DO_LOGOUT",
            });
        } catch (error) {
            return 500;
        }
    };
};