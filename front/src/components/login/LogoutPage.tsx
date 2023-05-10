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
		.then((res) => {
			if (res.status === 200)
				console.log(res.data);
			else
				console.log('logout fail');
		})
		.catch((err) => {
			console.log(err);
			console.log('logout fail');
		})
		
		localStorage.setItem("token", "");
		setToken("");
		navigate("/login");
	});

	return (
		<></>
	);
}

export default LogoutPage;
