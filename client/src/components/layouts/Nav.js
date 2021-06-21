import React, { Fragment, useContext } from "react";
import { FcContacts } from "react-icons/fc";
import { Link } from "react-router-dom";
import AuthContext from "../context/auth/AuthContext";
import { IoLogOutOutline } from "react-icons/io5";
import ContactContext from "../context/contacts/ContactContext";
const Nav = () => {
	const authContext = useContext(AuthContext);
	const contactContext = useContext(ContactContext);
	const logoutHandler = () => {
		// console.log("logoutHandler");
		authContext.logout();
		contactContext.clearContacts();
	};
	const authLinks = (
		<Fragment>
			<li className="nav__items flex">
				<Link
					to="/"
					title="Hello! Welcome to store contacts"
					className="nav__links"
				>
					Hello
				</Link>
			</li>
			<li className="nav__items flex">
				<button
					onClick={logoutHandler}
					className="nav__links btn flex flex-between"
				>
					<IoLogOutOutline />
					<p> Logout</p>
				</button>
			</li>
		</Fragment>
	);
	const guestLinks = (
		<Fragment>
			<li className="nav__items">
				<Link to="/login" className="nav__links">
					Login
				</Link>
			</li>
			<li className="nav__items flex flex-between">
				<Link to="/register" className="nav__links">
					Signup
				</Link>
			</li>
		</Fragment>
	);
	return (
		<nav className="navbar">
			<div className="container navbar navbar-md">
				<div className="logo">
					<FcContacts className="logo__icon" />
					<h3 className="logo__desc">Store Contacts</h3>
				</div>
				<ul className="nav">
					{authContext.isAuthenticated ? authLinks : guestLinks}
				</ul>
			</div>
		</nav>
	);
};
export default Nav;
