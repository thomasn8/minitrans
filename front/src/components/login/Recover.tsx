import React, { SyntheticEvent } from "react";
import { LoginDto } from "../../_dto/login-dto";

// import '../../assets/css/recover.css';

interface RecoverPageProps {
	user: LoginDto | undefined;
}

function RecoverPage({user}: RecoverPageProps) {
	return (
		<>Recover</>
	);
}

export default RecoverPage;
