import React, { SyntheticEvent } from "react";
import { useLoginRedirect } from "../login/useRedirect";
import { LoginDto } from "../../dto/login-dto";
import Nav from "../nav/Nav";
import '../../assets/css/game.css';

interface GamePageProps {
	user: LoginDto | undefined;
}

function GamePage({user}: GamePageProps) {
	
	useLoginRedirect(user);

	return (
		<div id="game">
			<h1  className="title">Game</h1>
			<Nav />

		</div>
	);
}

export default GamePage;
