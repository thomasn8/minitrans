import React from "react";
import { LoginDto } from "../../_dto/login-dto";
import { useNavigate } from "react-router-dom";
import { isExpired } from "react-jwt";
import { api_request } from "../../assets/utils";
import Cookies from 'js-cookie'

function useLoginRedirect(login: LoginDto | undefined, setToken: Function): void {

	const navigate = useNavigate();

	React.useEffect(() => {
		const token = localStorage.getItem("token");
		if (login === undefined || token === null) {
			navigate("/login");
		}
		else if (isExpired(token) === true) {
			console.log('TOKEN EXPIRED');
			const refresh_token = Cookies.get('Authentication');	// comment obtenir le refresh_token depuis les cookies ??
			console.log('from cookies', refresh_token);

			// const refresh_token = '';
			// console.log(Cookies.get());
			
			api_request('post', '/api/auth/refresh', refresh_token)
			.then((res) => {
				if (res.status === 200) {
					localStorage.setItem("token", res.data);
					setToken(res.data);
				}
				else
				{
					console.log('TOKEN NOT VALID, CAN GET NEW PAIR OF TOKEN');
					localStorage.setItem("token", '');		// OR NAVIGATE TO LOGOUT
					setToken('');
				}
			})
			.catch((err) => {
				console.log('TOKEN NOT VALID, CAN GET NEW PAIR OF TOKEN');
				console.log(err);
				localStorage.setItem("token", '');			// OR NAVIGATE TO LOGOUT
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
