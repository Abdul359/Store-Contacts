import React, { useContext, useEffect, useState } from "react";
import { RiLoginBoxFill } from "react-icons/ri";
import AlertContext from "../context/alert/AlertContext";
import AuthContext from "../context/auth/AuthContext";
import signup from "../layouts/images/signup.svg";

const RegisterForm = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	useEffect(() => {
		if (authContext.isAuthenticated) {
			props.history.push("/");
		}
		if (authContext.error === "user already exist") {
			alertContext.setAlert(authContext.error, "danger");
			authContext.clearErrors();
		}
		//eslint-disable-next-line
	}, [authContext.error, authContext.isAuthenticated, props.history]);
	const [user, setUser] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});
	const { name, email, password, password2 } = user;
	const changeHandler = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();
		if (name === "" || email === "" || password === "") {
			alertContext.setAlert("Please enter all the fields", "danger");
		} else if (password !== password2) {
			alertContext.setAlert("Password do not match", "info");
		} else {
			authContext.register({ name, email, password });
		}
	};
	return (
		<div className="flex login-parent signup">
			<div className="container bd">
				<div className="flex flex-start container-st">
					<RiLoginBoxFill className="icon" />
					<h1 className="title">Sign up</h1>
				</div>
				<form
					action=""
					className="form form-md"
					onSubmit={onSubmitHandler}
				>
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
						<label htmlFor="password" className="label">
							Password
						</label>
						<input
							type="password"
							className="input"
							id="password"
							name="password"
							value={password}
							onChange={changeHandler}
						/>
					</div>
					<div className="form__child">
						<label htmlFor="password2" className="label">
							Re-enter Password
						</label>
						<input
							type="password"
							className="input"
							id="passworde"
							name="password2"
							value={password2}
							onChange={changeHandler}
						/>
					</div>
					<button className="btn" onClick={onSubmitHandler}>
						Sign up
					</button>
				</form>
			</div>
			<img src={signup} alt="sign-up" className="svg signup_svg" />
		</div>
	);
};

export default RegisterForm;
