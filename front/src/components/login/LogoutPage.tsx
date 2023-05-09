import React from "react";
import { LoginDto } from "../../_dto/login-dto";
import { useNavigate } from "react-router-dom";

interface LogoutPageProps {
	login: LoginDto | undefined;
	setToken: Function;
}

function LogoutPage({login, setToken}: LogoutPageProps) {

	const navigate = useNavigate();

	React.useEffect(() => {
		localStorage.setItem("token", "");
		setToken("");
		// request to api/logout in order to delete refresh token from the db
		navigate("/login");
	});

	return (
		<></>
	);
}

export default LogoutPage;
