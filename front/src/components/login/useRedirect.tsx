import React from "react";
import { LoginDto } from "../../_dto/login-dto";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import { api_request } from "../../assets/utils";

function useLoginRedirect(login: LoginDto | undefined, setToken: Function): void {

	const navigate = useNavigate();

	React.useEffect(() => {
		const token = localStorage.getItem("token");
		if (login === undefined || token === null) {
			navigate("/login");
		}
		else if (isExpired(token) === true) {
			api_request('get', '/api/auth/refresh')
			.then((res) => {
				if (res.status === 200) {
					localStorage.setItem("token", res.data);
					setToken(res.data);
				}
				else
				{
					localStorage.setItem("token", '');
					setToken('');
				}
			})
			.catch((err) => {
				localStorage.setItem("token", '');
				setToken('');
			});
		}
	}, [login]);
}

function useHomeRedirect(login: LoginDto | undefined): void {

	const navigate = useNavigate();

	React.useEffect(() => {
		if (login !== undefined)
			navigate("/");
	}, [login]);
}

export { useLoginRedirect, useHomeRedirect, };
