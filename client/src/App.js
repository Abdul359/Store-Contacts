import { Fragment, useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/layouts/Nav";
import Home from "./components/pages/Home";
import ContactState from "./components/context/contacts/ContactState";
import AuthState from "./components/context/auth/AuthState";
import RegisterForm from "./components/auth/RegisterForm";
import Login from "./components/auth/Login";
import AlertState from "./components/context/alert/AlertState";
import Alerts from "./components/layouts/Alerts";
// import SetAuthToken from "./componens/utils/SetAuthToken";
import PrivateRoutes from "./routes/PrivateRoutes";
import SetAuthToken from "./components/utils/SetAuthToken";

// if (localStorage.token) {
// 	SetAuthToken(localStorage.token);
// }
if (localStorage.token) {
	SetAuthToken(localStorage.token);
}
function App() {
	return (
		<AuthState>
			<ContactState>
				<AlertState>
					<Router>
						<Fragment>
							<Nav />
							{/* <InandOut /> */}
							<Alerts />
							<div className="container">
								<Switch>
									<PrivateRoutes
										exact
										path="/"
										component={Home}
									/>
									<Route
										exact
										path="/register"
										component={RegisterForm}
									/>
									<Route
										exact
										path="/login"
										component={Login}
									/>
								</Switch>
							</div>
						</Fragment>
					</Router>
				</AlertState>
			</ContactState>
		</AuthState>
	);
}

export default App;
