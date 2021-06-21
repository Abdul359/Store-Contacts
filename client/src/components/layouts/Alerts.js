import React, { useContext } from "react";
import AlertContext from "../context/alert/AlertContext";
import { AiOutlineAlert } from "react-icons/ai";
const Alerts = () => {
	const alertContext = useContext(AlertContext);
	return alertContext.alerts.map((alert) => {
		return (
			<div key={alert.id} className={`alert alert-${alert.type} flex`}>
				<AiOutlineAlert className="alerticon" />
				<p className={`title title-${alert.type}`}>{alert.message}</p>
			</div>
		);
	});
};

export default Alerts;
