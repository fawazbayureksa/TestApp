import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import Users from "../reducers/user.reducer";
import Auth from "../reducers/auth.reducer";

const combine = combineReducers({
    users: Users,
    auth: Auth,
});

const Store = createStore(combine, applyMiddleware(thunk));
export default Store;