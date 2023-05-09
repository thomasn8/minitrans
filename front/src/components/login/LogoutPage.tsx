import React, { SyntheticEvent } from "react";
import { LoginDto } from "../../_dto/login-dto";

// import '../../assets/css/logout.css';

interface LogoutPageProps {
	login: LoginDto | undefined;
}

function LogoutPage({login}: LogoutPageProps) {
	return (
		<>logout</>
	);
}

export default LogoutPage;
