import React, { SyntheticEvent } from "react";
import { useLoginRedirect } from "../login/useRedirect";
import { LoginDto } from "../../dto/login-dto";
import Nav from "../nav/Nav";

import styles from './css/Game.module.css'

interface GamePageProps {
	user: LoginDto | undefined;
}

function GamePage({user}: GamePageProps) {
	
	useLoginRedirect(user);

	return (
		<div id="game" className={styles.game_wrapper}>
			<h1 className={`title`}>Game</h1>
			<Nav />
		</div>
	);
}

export default GamePage;
