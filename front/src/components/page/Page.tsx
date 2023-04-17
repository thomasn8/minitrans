import React, { SyntheticEvent } from "react";
import { useLoginRedirect } from "../login/useRedirect";
import { LoginDto } from "../../dto/login-dto";

import '../../assets/css/page.css';

interface PageProps {
	user: LoginDto | undefined;
}

function Page({user}: PageProps) {

	useLoginRedirect(user);
	
	return (
		<></>
	);
}

export default Page;
