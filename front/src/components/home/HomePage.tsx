import React from "react";
import { Link } from "react-router-dom";
import { useLoginRedirect } from "../login/useRedirect";
import { LoginDto } from "../../_dto/login-dto";
import Nav from "../nav/Nav";

import styles from './css/Home.module.css'
import { ChatSvg, GameSvg } from "../../assets/svg/home-icones";

interface HomePageProps {
	user: LoginDto | undefined;
}

function HomePage({user}: HomePageProps) {

	useLoginRedirect(user);

	const [alignment, setAlignment] = React.useState('justify_center');
	React.useEffect(() => {
		let appli_count = document.querySelectorAll('#home .appli').length;
		if (appli_count > 4) {
			setAlignment('justify_left');
		}
	}, []);

	return (
		<div id="home" className={styles.home_wrapper}>
			{user && 
			<>
			<h1 className={`title`}>Home</h1>
			<Nav page={'home'}/>
			
			<div className={`${styles.applis} ${alignment}`}>

				<Link to="/chat" className={styles.appli}>
					<div className={styles.appli_img}>
						<ChatSvg />
					</div>
					<div className={styles.appli_name}>Chat</div>
				</Link>

				<Link to="/game" className={styles.appli}>
					<div className={styles.appli_img}>
						<GameSvg />
					</div>
					<div className={styles.appli_name}>Game</div>
				</Link>

			</div>
			</>}
		</div>
	);
}

export default HomePage;
