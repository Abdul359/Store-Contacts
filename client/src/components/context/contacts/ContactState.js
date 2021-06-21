import React, { useReducer } from "react";
import axios from "axios";
import {
	ADD_CONTACT,
	CLEAR_CONTACTS,
	CLEAR_CURRENT,
	CLEAR_FILTER,
	CONTACT__FAIL,
	DELETE_CONTACT,
	FILTER_CONTACTS,
	GET_CONTACTS,
	SET_CURRENT,
	UPDATE_CONTACT,
} from "../types";
import ContactContext from "./ContactContext";
import contactReducer from "./contactReducer";

const initialState = {
	contacts: null,
	current: null,
	searchedText: null,
	error: null,
};
function ContactState(props) {
	const [contactState, dispatch] = useReducer(contactReducer, initialState);

	const getContacts = async (newSubmittedContact) => {
		try {
			const res = await axios.get("/store/contacts");
			dispatch({ type: GET_CONTACTS, payload: res.data });
		} catch (error) {
			dispatch({ type: CONTACT__FAIL, payload: error.response.msg });
		}
	};

	const addContact = async (newSubmittedContact) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.post(
				"/store/contacts",
				newSubmittedContact,
				config
			);
			dispatch({ type: ADD_CONTACT, payload: res.data });
		} catch (error) {
			dispatch({ type: CONTACT__FAIL, payload: error.response.msg });
		}
	};
	const deleteContact = async (id) => {
		try {
			await axios.delete(`/store/contacts/${id}`);
			dispatch({ type: DELETE_CONTACT, payload: id });
		} catch (error) {
			dispatch({ type: CONTACT__FAIL, payload: error.response.msg });
		}
	};
	const updateContact = async (contact) => {
		const config = {
			headers: {
				"Content-Type": "application/json",
			},
		};
		try {
			const res = await axios.put(
				`/store/contacts/${contact._id}`,
				contact,
				config
			);
			// console.log(res.data);
			dispatch({ type: UPDATE_CONTACT, payload: res.data });
		} catch (error) {
			dispatch({ type: CONTACT__FAIL, payload: error.response.msg });
		}
	};
	const clearContacts = () => {
		dispatch({ type: CLEAR_CONTACTS });
	};
	const setCurrent = (contact) => {
		dispatch({ type: SET_CURRENT, payload: contact });
	};
	const clearCurrent = () => {
		dispatch({ type: CLEAR_CURRENT });
	};
	const filterContacts = (text) => {
		dispatch({ type: FILTER_CONTACTS, payload: text });
	};
	const clearFilter = () => {
		dispatch({ type: CLEAR_FILTER });
	};
	return (
		<ContactContext.Provider
			value={{
				contacts: contactState.contacts,
				current: contactState.current,
				searchedText: contactState.searchedText,
				error: contactState.error,
				addContact,
				deleteContact,
				setCurrent,
				clearCurrent,
				updateContact,
				filterContacts,
				clearFilter,
				getContacts,
				clearContacts,
			}}
		>
			{props.children}
		</ContactContext.Provider>
	);
}

export default ContactState;
