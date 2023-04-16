import { LoginDto } from "../../dto/login-dto";

import '../../assets/css/home.css'

interface HomePageProps {
	user: LoginDto | undefined;
}

function HomePage({user}: HomePageProps) {
	return (
		<>
		<div className="home">
			<h1>hello</h1>
		</div>
		</>
	);
}

export default HomePage;
