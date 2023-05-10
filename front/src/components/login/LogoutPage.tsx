import React from "react";
import { LoginDto } from "../../_dto/login-dto";
import { useNavigate } from "react-router-dom";
import { api_request } from "../../assets/utils";

interface LogoutPageProps {
	login: LoginDto | undefined;
	setToken: Function;
}

function LogoutPage({login, setToken}: LogoutPageProps) {

	const navigate = useNavigate();

	React.useEffect(() => {
		api_request('get', '/api/auth/logout')
		.catch((err) => {
			console.log(err);
		});

		localStorage.setItem("token", "");
		setToken("");
		navigate("/login");
	});

	return (
		<></>
	);
}

export default LogoutPage;
