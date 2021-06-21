import {
	AUTH_ERROR,
	CLEAR_ERRORS,
	LOGIN_FAIL,
	LOGIN_SUCCESS,
	LOGOUT,
	REGISTER_FAIL,
	REGISTER_SUCCESS,
	USER_LOADED,
} from "../types";

const authReducer = (state, action) => {
	switch (action.type) {
		case USER_LOADED:
			// console.log("user loaded");
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: action.payload,
			};
		case REGISTER_SUCCESS:
			// console.log("register success");
			localStorage.setItem("token", action.payload.token);
			console.log("reducer");
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			};
		case LOGIN_SUCCESS:
			// console.log("login sucess");
			localStorage.setItem("token", action.payload.token);
			console.log("reducer");
			return {
				...state,
				...action.payload,
				isAuthenticated: true,
				loading: false,
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuthenticated: false,
				loading: false,
				user: null,
				error: action.payload,
			};

		case LOGOUT:
			localStorage.removeItem("token");
			// console.log("reducer");
			return {
				...state,
				token: null,
				isAuthenticated: null,
				loading: false,
				user: null,
				error: action.payload,
			};
		case CLEAR_ERRORS:
			return {
				...state,
				error: null,
			};
		default:
			return state;
	}
};

export default authReducer;
