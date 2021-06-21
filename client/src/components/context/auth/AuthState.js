import React, { useReducer } from "react";
import axios from "axios";
import AuthContext from "./AuthContext";
import authReducer from "./authReducer";
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
import SetAuthToken from "../../utils/SetAuthToken";

const initialState = {
	token: localStorage.getItem("token"),
	isAuthenticated: null,
	loading: true,
	user: null,
	error: null,
};
const AuthState = (props) => {
	const [authState, dispatch] = useReducer(authReducer, initialState);

	const loadUser = async () => {
		if (localStorage.token) {
			SetAuthToken(localStorage.token);
		}
		try {
			const res = await axios.get("/store/auth");
			dispatch({ type: USER_LOADED, payload: res.data });
		} catch (error) {
			dispatch({ type: AUTH_ERROR });
		}
	};

	const register = async (data) => {
		const config = {
			headers: {
				"Contect-Type": "application/json",
			},
		};
		try {
			const res = await axios.post("/store/users", data, config);
			dispatch({ type: REGISTER_SUCCESS, payload: res.data });
			loadUser();
		} catch (error) {
			dispatch({
				type: REGISTER_FAIL,
				payload: error.response.data.message,
			});
		}
	};
	const login = async (data) => {
		const config = {
			headers: {
				"Contect-Type": "application/json",
			},
		};
		try {
			const res = await axios.post("/store/auth", data, config);
			dispatch({ type: LOGIN_SUCCESS, payload: res.data });
			loadUser();
		} catch (error) {
			dispatch({
				type: LOGIN_FAIL,
				payload: error.response.data.message,
			});
		}
	};
	const logout = () => {
		// console.log("auth logout");
		dispatch({ type: LOGOUT });
	};

	const clearErrors = () => {
		dispatch({ type: CLEAR_ERRORS });
	};
	return (
		<AuthContext.Provider
			value={{
				token: authState.token,
				isAuthenticated: authState.isAuthenticated,
				loading: authState.loading,
				user: authState.user,
				error: authState.error,
				register,
				clearErrors,
				loadUser,
				login,
				logout,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
