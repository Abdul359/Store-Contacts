import {
	ADD_CONTACT,
	DELETE_CONTACT,
	SET_CURRENT,
	CLEAR_CURRENT,
	UPDATE_CONTACT,
	FILTER_CONTACTS,
	CONTACT__FAIL,
	GET_CONTACTS,
	CLEAR_CONTACTS,
} from "../types";

const contactReducer = (state, action) => {
	switch (action.type) {
		case GET_CONTACTS:
			return {
				...state,
				contacts: action.payload,
				loding: false,
			};
		case ADD_CONTACT:
			return {
				...state,
				contacts: [action.payload, ...state.contacts],
				loding: false,
			};
		case UPDATE_CONTACT:
			return {
				...state,
				contacts: state.contacts.map((contact) =>
					contact._id === action.payload._id
						? action.payload
						: contact
				),
				loding: false,
			};
		case DELETE_CONTACT:
			return {
				...state,
				contacts: state.contacts.filter(
					(contact) => contact._id !== action.payload
				),
				loding: false,
			};
		case CLEAR_CONTACTS:
			return {
				...state,
				contacts: null,
			};
		case SET_CURRENT:
			return {
				...state,
				current: action.payload,
			};
		case CLEAR_CURRENT:
			return {
				...state,
				current: null,
			};
		case FILTER_CONTACTS:
			return {
				...state,
				searchedText: state.contacts.filter((contact) => {
					const regEx = new RegExp(`${action.payload}`, "gi");
					return (
						contact.name.match(regEx) || contact.email.match(regEx)
					);
				}),
			};
		case CONTACT__FAIL:
			return {
				...state,
				error: action.payload,
			};
		default:
			return state;
	}
};
export default contactReducer;
