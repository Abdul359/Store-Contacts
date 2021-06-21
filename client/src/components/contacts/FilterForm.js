import React, { useContext, useEffect, useRef } from "react";
import ContactContext from "../context/contacts/ContactContext";

const FilterForm = () => {
	useEffect(() => {
		if (contactContext.searchedText === null) {
			inputRef.current.value = "";
		}
	});
	const contactContext = useContext(ContactContext);
	const inputRef = useRef("");
	const changeHandler = (e) => {
		if (inputRef.current.value !== "") {
			contactContext.filterContacts(e.target.value);
		} else {
			contactContext.clearFilter();
		}
	};
	return (
		<form>
			<input
				type="text"
				className="input input__filter"
				ref={inputRef}
				placeholder="Search contacts"
				onChange={changeHandler}
			/>
		</form>
	);
};

export default FilterForm;
