import React, { useContext } from "react";
import AuthContext from "../components/context/auth/AuthContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoutes = ({ component: Component, ...rest }) => {
	const authContext = useContext(AuthContext);
	return (
		<Route
			{...rest}
			render={(props) =>
				!authContext.isAuthenticated && !authContext.loading ? (
					<Redirect to="/login" />
				) : (
					<Component {...props}></Component>
				)
			}
		/>
	);
};

export default PrivateRoutes;
