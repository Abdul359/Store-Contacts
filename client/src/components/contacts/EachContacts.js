import React, { useContext } from "react";
import ContactContext from "../context/contacts/ContactContext";
import { FcFeedback, FcIphone } from "react-icons/fc";

const EachContacts = ({ contact }) => {
	const contactContext = useContext(ContactContext);
	const { _id, name, email, phone, type } = contact;
	const deleteHandler = () => {
		contactContext.deleteContact(_id);
		contactContext.clearCurrent();
	};
	const editContactHandler = () => {
		contactContext.setCurrent(contact);
	};
	return (
		<div className="sec">
			<div className="sec__Child flex flex-between">
				<h3>{name}</h3>
				{type && <p>{type}</p>}
			</div>
			<div className="sec__child flex flex-start">
				<FcFeedback className="sec__child-icon" />
				<p className="sec__child-email">{email}</p>
			</div>
			<div className="sec__child flex flex-start">
				<FcIphone className="sec__child-icon" />
				<p className="sec__child-phone">{phone}</p>
			</div>
			<button className="btn btn-p" onClick={editContactHandler}>
				Edit
			</button>
			<button className="btn btn-d" onClick={deleteHandler}>
				Delete
			</button>
		</div>
	);
};

export default EachContacts;
