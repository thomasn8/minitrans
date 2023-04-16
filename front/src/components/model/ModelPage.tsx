import React, { SyntheticEvent } from "react";
import { useLoginRedirect } from "../login/useRedirect";
import { LoginDto } from "../../dto/login-dto";

import '../../assets/css/model.css';

interface ModelPageProps {
	user: LoginDto | undefined;
}

function ModelPage({user}: ModelPageProps) {

	useLoginRedirect(user);
	
	return (
		<></>
	);
}

export default ModelPage;
