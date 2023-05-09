import React from "react";
import { LoginDto } from "../../_dto/login-dto";
import { useNavigate } from "react-router-dom";

function useLoginRedirect(login: LoginDto | undefined): void {

	const navigate = useNavigate();

	React.useEffect(() => {
		if (login === undefined)
			navigate("/login");
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
