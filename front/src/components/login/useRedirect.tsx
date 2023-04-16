import React from "react";
import { LoginDto } from "../../dto/login-dto";
import { useNavigate } from "react-router-dom";

function useLoginRedirect(user: LoginDto | undefined): void {

	const navigate = useNavigate();

	React.useEffect(() => {
		if (user === undefined)
			navigate("/login");
	}, [user]);
}

function useHomeRedirect(user: LoginDto | undefined): void {

	const navigate = useNavigate();

	React.useEffect(() => {
		if (user !== undefined)
			navigate("/");
	}, [user]);
}

export { useLoginRedirect, useHomeRedirect, };
