import React from "react";
import { Link } from "react-router-dom";

const InandOut = () => {
	return (
		<div className="flex flex-around container-md">
			<Link to="/login" className="btn btn-p">
				Log in
			</Link>
			<Link to="/register" className="btn btn-d">
				Sign up
			</Link>
		</div>
	);
};

export default InandOut;
