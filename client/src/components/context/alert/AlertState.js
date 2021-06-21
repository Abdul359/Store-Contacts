import React, { useReducer } from "react";
import AlertContext from "./AlertContext";
import alertReducer from "./alertReducer";
import { v4 as uuidv4 } from "uuid";
import { REMOVE_ALERT, SET_ALERT } from "../types";
const initialState = [];
const AlertState = (props) => {
	const [alertState, dispatch] = useReducer(alertReducer, initialState);
	const setAlert = (message, type) => {
		const id = uuidv4();
		dispatch({
			type: SET_ALERT,
			payload: {
				message,
				type,
				id,
			},
		});
		setTimeout(() => {
			dispatch({ type: REMOVE_ALERT, payload: id });
		}, 5000);
	};
	return (
		<AlertContext.Provider
			value={{
				alerts: alertState,
				setAlert,
			}}
		>
			{props.children}
		</AlertContext.Provider>
	);
};

export default AlertState;
