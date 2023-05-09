import React, { SyntheticEvent } from "react";
import { useLoginRedirect } from "../login/useRedirect";
import { LoginDto } from "../../_dto/login-dto";

import '../../assets/css/page.css';

interface PageProps {
	login: LoginDto | undefined;
	setToken: Function;
}

function Page({login, setToken}: PageProps) {

	useLoginRedirect(login, setToken);
	
	return (
		<></>
	);
}

export default Page;
