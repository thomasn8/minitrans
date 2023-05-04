import React, { SyntheticEvent } from "react";
import { useSearchParams } from "react-router-dom";
import { api_request } from "../../assets/utils";
import { Link } from "react-router-dom";

import styles from './css/SigninConfirm.module.css'

function SigninConfirmPage() {

	const [successMessage, setSuccesMessage] = React.useState('');
	const [errorMessage, setErrorMessage] = React.useState('');

	// get the token from url
	const [searchParams] = useSearchParams();
	const confirmToken = searchParams.get("token");

	// send request to the api
	React.useEffect(() => {
		if (confirmToken) {
			const fetchData = async () => {
				const res = await api_request(
					'post',
					`/api/auth/signin-confirm?token=${confirmToken}`,
					undefined,
					{token: confirmToken}
				);
				return res;
			}
		
			fetchData()
			.then((res) => {
				console.log(res.data);
				setSuccesMessage('Registration confirmed. Welcome among us !')
			})
			.catch((err) => {
				console.log('error:', err.response.data);
				setErrorMessage(err.response.data.message);
			});
		}
	
	}, [])

	// ADD AN IMAGE FROM THE FACTION IN successMessage
	return (
		<div id="signin" className={styles.signin_wrapper}>
		{
			successMessage !== '' && 
			<div>{successMessage}</div>
		
		||
		
			errorMessage !== '' && 
			<div>{errorMessage}</div>
		}

			<div className={`nav ${styles.login}`}>
				<Link to="/login">Back to login</Link>
			</div>

		</div>
	);
}

export default SigninConfirmPage;
