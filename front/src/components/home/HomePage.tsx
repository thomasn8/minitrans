import React from "react";
import { Link } from "react-router-dom";
import { useLoginRedirect } from "../login/useRedirect";
import { LoginDto } from "../../dto/login-dto";
import Nav from "../nav/Nav";

import { ChatSvg, GameSvg } from "../../assets/svg/home-icones";
import '../../assets/css/home.css'

interface HomePageProps {
	user: LoginDto | undefined;
}

function HomePage({user}: HomePageProps) {

	useLoginRedirect(user);

	const [alignment, setAlignment] = React.useState('applis-center');
	React.useEffect(() => {
		let appli_count = document.querySelectorAll('#home .appli').length;
		if (appli_count > 4) {
			setAlignment('applis-left');
		}
	}, []);

	return (
		<div id="home">
			{user && 
			<>
			<h1 className="title">Home</h1>
			<Nav page={'home'}/>
			
			<div className={`applis ${alignment}`}>

				<Link to="/chat" className="appli">
					<div className="appli-img">
						<ChatSvg />
					</div>
					<div className="appli-name">Chat</div>
				</Link>

				<Link to="/game" className="appli">
					<div className="appli-img">
						<GameSvg />
					</div>
					<div className="appli-name">Game</div>
				</Link>

			</div>
			</>}
		</div>
	);
}

export default HomePage;
