import React, { SyntheticEvent } from "react";
import { LoginDto } from "../../dto/login-dto";

// import '../../assets/css/logout.css';

interface LogoutPageProps {
	user: LoginDto | undefined;
}

function LogoutPage({user}: LogoutPageProps) {
	return (
		<>logout</>
	);
}

export default LogoutPage;
