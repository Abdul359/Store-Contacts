import React, { useContext, useState, useEffect } from "react";
import ContactContext from "../context/contacts/ContactContext";
import { FcPlus } from "react-icons/fc";

const AddContactForm = () => {
	const contactContext = useContext(ContactContext);
	useEffect(() => {
		if (contactContext.current !== null) {
			setContact(contactContext.current);
		} else {
			setContact({
				name: "",
				email: "",
				phone: "",
				type: "personal",
			});
		}
	}, [contactContext]);
	const [contact, setContact] = useState({
		name: "",
		email: "",
		phone: "",
		type: "personal",
	});
	const { name, email, phone, type } = contact;
	const changeHandler = (e) => {
		setContact({
			...contact,
			[e.target.name]: e.target.value,
		});
	};
	const submitHandler = (e) => {
		e.preventDefault();
		if (contactContext.current === null) {
			contactContext.addContact(contact);
		} else {
			contactContext.updateContact(contact);
		}
		clearCurrentContact();
	};
	const clearCurrentContact = () => {
		contactContext.clearCurrent();
	};
	return (
		<div className="form-wrapper">
			<form className="form" action="" onSubmit={submitHandler}>
				<div className="flex flex-start">
					<FcPlus className="icon" />
					<h2 className="title">
						{contactContext.current
							? "Edit Contact"
							: "Add Contact"}
					</h2>
				</div>
				<div className="form__child">
					<label htmlFor="name" className="label">
						Name
					</label>
					<input
						type="text"
						className="input"
						id="name"
						name="name"
						value={name}
						onChange={changeHandler}
					/>
				</div>
				<div className="form__child">
					<label htmlFor="email" className="label">
						Email
					</label>
					<input
						type="email"
						className="input"
						id="email"
						name="email"
						value={email}
						onChange={changeHandler}
					/>
				</div>
				<div className="form__child">
					<label htmlFor="phone" className="label">
						Phone
					</label>
					<input
						type="text"
						className="input"
						id="phone"
						name="phone"
						value={phone}
						onChange={changeHandler}
					/>
				</div>
				<div className="form__child">
					<input
						type="radio"
						className="radio"
						id="personal"
						value="personal"
						checked={type === "personal"}
						onChange={changeHandler}
						name="type"
					/>
					<label htmlFor="personal" className="label-radio">
						personal
					</label>
					<input
						type="radio"
						id="professional"
						className="radio"
						checked={type === "professional"}
						onChange={changeHandler}
						name="type"
						value="professional"
					/>
					<label htmlFor="professional" className="label-radio">
						professional
					</label>
				</div>
				<button className="btn">
					{contactContext.current ? "Save Contact" : "Add Contact"}
				</button>
				{contactContext.current && (
					<div>
						<button className="btn" onClick={clearCurrentContact}>
							Clear All
						</button>
					</div>
				)}
			</form>
		</div>
	);
};

export default AddContactForm;
