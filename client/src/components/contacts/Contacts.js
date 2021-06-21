import React, { useContext, useEffect } from "react";
import ContactContext from "../context/contacts/ContactContext";
import EachContacts from "./EachContacts";
import { FcBusinessContact } from "react-icons/fc";
import FilterForm from "./FilterForm";
import Spinner from "../layouts/Spinner";

const Contacts = () => {
	const contactContext = useContext(ContactContext);
	useEffect(() => {
		contactContext.getContacts();
		//eslint-disable-next-line
	}, []);
	if (
		contactContext.contacts !== null &&
		contactContext.contacts.length === 0 &&
		!contactContext.loading
	) {
		return <h3 className="title">Add contacts</h3>;
	}
	return (
		<div className="contact-wrapper">
			<div className="flex flex-start">
				<FcBusinessContact className="icon" />
				<h2 className="title">Saved Contacts</h2>
			</div>
			<FilterForm />
			{contactContext.contacts !== null && !contactContext.loading ? (
				contactContext.searchedText !== null ? (
					contactContext.searchedText.map((contact) => {
						return (
							<EachContacts key={contact._id} contact={contact} />
						);
					})
				) : (
					contactContext.contacts.map((contact) => {
						return (
							<EachContacts key={contact._id} contact={contact} />
						);
					})
				)
			) : (
				<Spinner />
			)}
			{}
		</div>
	);
};

export default Contacts;
