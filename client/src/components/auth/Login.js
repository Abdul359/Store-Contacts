import React, { useContext, useState, useEffect } from "react";
import { RiLoginBoxFill } from "react-icons/ri";
import AlertContext from "../context/alert/AlertContext";
import AuthContext from "../context/auth/AuthContext";
import login from "../layouts/images/login.svg";
const Login = (props) => {
	const alertContext = useContext(AlertContext);
	const authContext = useContext(AuthContext);
	useEffect(() => {
		if (authContext.isAuthenticated) {
			props.history.push("/");
		}
		if (
			authContext.error === "invalid email" ||
			authContext.error === "invalid password"
		) {
			alertContext.setAlert(authContext.error, "danger");
			authContext.clearErrors();
		}
		//eslint-disable-next-line
	}, [authContext.error, authContext.isAuthenticated, props.history]);
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const { email, password } = user;
	const changeHandler = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};
	const onSubmitHandler = (e) => {
		e.preventDefault();
		if (email === "") {
			alertContext.setAlert("Please enter email", "info");
		} else if (password === "") {
			alertContext.setAlert("Please enter password", "danger");
		} else {
			authContext.login({ email, password });
		}
	};
	return (
		<div className="flex  login-parent">
			<div className="container form-log">
				<div className="flex flex-start container-st">
					<RiLoginBoxFill className="icon" />
					<h1 className="title">Log in</h1>
				</div>
				<form
					action=""
					className="form form-md"
					onSubmit={onSubmitHandler}
				>
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
					<button className="btn" onClick={onSubmitHandler}>
						Log in
					</button>
				</form>
			</div>
			<img src={login} alt="log-in" className="svg login_svg" />
		</div>
	);
};

export default Login;
