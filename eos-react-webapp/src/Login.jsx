import { useRef, useState, useEffect, useContext } from 'react';

import CatalogList from './CatalogList';
import axios from './api/axios';
import { useNavigate } from 'react-router-dom';
const LOGIN_URL = '/v1/user/login';

const Login = () => {
	const userRef = useRef();
	const errRef = useRef();
	const navigate = useNavigate()

	const [user, setUser] = useState('');
	const [pwd, setPwd] = useState('');
	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	useEffect(() => {
		setErrMsg('');
	}, [user, pwd]);

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			let login = {
				"username": user,
				"password": pwd
			}
			let response = await axios.post(LOGIN_URL, login, null);
			// console.log(response.data);
			if(!response){
				setErrMsg('Login Failed');
				setUser('');
				setPwd('');
				throw errMsg;
			} else {
				setUser('');
				setPwd('');
				// setSuccess(true);
				// if (success) {
				// 	navigate('/catalog')
				// }
				// console.log('user in login',response.data);
				await localStorage.setItem('user',JSON.stringify(response.data))
				// let user = JSON.parse(localStorage.getItem('user'))
				// console.log('user',user);
				navigate('/')
			}
		} catch (err) {
			if (!err?.response) {
				setErrMsg('No Server Response');
			} else if (err.response?.status === 400) {
				setErrMsg('Missing Username or Password');
			} else if (err.response?.status === 401) {
				setErrMsg('Unauthorized');
			} else {
				setErrMsg('Login Failed');
			}
			errRef.current.focus();
		}
	};

	return (
		<section>
					<p
						ref={errRef}
						className={errMsg ? 'errmsg' : 'offscreen'}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<h1>Sign In</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor="username">Username:</label>
						<input
							type="text"
							id="username"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setUser(e.target.value)}
							value={user}
							required
						/>

						<label htmlFor="password">Password:</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							required
						/>
						<button>Sign In</button>
					</form>
					<p>
						Need an Account?
						<br />
						<span className="line">
							<a href="/signup">Sign Up</a>
						</span>
					</p>
				</section>
	);
};

export default Login;
