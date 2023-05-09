import React, { SyntheticEvent } from "react";
import { useLoginRedirect } from "../login/useRedirect";
import { LoginDto } from "../../_dto/login-dto";
import Nav from "../nav/Nav";

import styles from './css/Game.module.css'

interface GamePageProps {
	login: LoginDto | undefined;
	setToken: Function;
}

function GamePage({login, setToken}: GamePageProps) {
	
	useLoginRedirect(login, setToken);

	return (
		<div id="game" className={styles.game_wrapper}>
			<h1 className={`title`}>Game</h1>
			<Nav />
		</div>
	);
}

export default GamePage;
