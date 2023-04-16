import React, { SyntheticEvent } from "react";
import { useLoginRedirect } from "../login/useRedirect";
import { LoginDto } from "../../dto/login-dto";

import '../../assets/css/game.css';

interface GamePageProps {
	user: LoginDto | undefined;
}

function GamePage({user}: GamePageProps) {
	
	useLoginRedirect(user);

	return (
		<h1>Game</h1>
	);
}

export default GamePage;
