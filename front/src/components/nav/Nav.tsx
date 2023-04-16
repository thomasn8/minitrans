import { Link } from "react-router-dom";

interface NavProps {
	page?: string;
}

function Nav({page}: NavProps) {
	return (
			<div className="nav nav-top">
				{page !== 'home' &&
				<>
					<Link to="/">Home</Link>
					<span>/</span>
				</>				
				}
				<Link to="/logout">Logout</Link>
			</div>
	);
}

export default Nav;
