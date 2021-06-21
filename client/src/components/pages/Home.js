import React, { useContext, useEffect } from "react";
import Contacts from "../contacts/Contacts";
import AddContactForm from "../layouts/AddContactForm";
import "../../App.css";
import AuthContext from "../context/auth/AuthContext";

function Home() {
	const authContext = useContext(AuthContext);
	useEffect(() => {
		authContext.loadUser();
		//eslint-disable-next-line
	}, []);
	return (
		<div className="grid">
			<AddContactForm />
			<Contacts />
		</div>
	);
}

export default Home;
