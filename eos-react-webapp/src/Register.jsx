import { useRef, useState, useEffect } from 'react';
import Login from './Login';
import axios from './api/axios';
const REGISTER_URL = '/v1/user/register';

const Register = () => {
	const userRef = useRef();
	const errRef = useRef();

	const [user, setUser] = useState('');
	const [userFocus, setUserFocus] = useState(false);

	const [pwd, setPwd] = useState('');
	const [pwdFocus, setPwdFocus] = useState(false);

	const [email, setEmail] = useState('');
	const [emailFocus, setEmailFocus] = useState(false);

	const [mobile, setMobile] = useState('');
	const [mobileFocus, setMobileFocus] = useState(false);

	const [errMsg, setErrMsg] = useState('');
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		userRef.current.focus();
	}, []);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			let userRq = {
				"username": user,
				"password": pwd,
				"email": email,
				"mobile": mobile
			}
			let response = await axios.post(REGISTER_URL, userRq, null);
			console.log(response.data);
				setUser('');
				setPwd('');
				setEmail('');
				setMobile('');
				setSuccess(true);
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
		<>
			{success ? (
				<Login />
			) : (
				<section >
					<p
						ref={errRef}
						className={errMsg ? 'errmsg' : 'offscreen'}
						aria-live="assertive"
					>
						{errMsg}
					</p>
					<h1>Register</h1>
					<form onSubmit={handleSubmit}>
						<label htmlFor="username">
							Username:
						</label>
						<input
							type="text"
							id="username"
							ref={userRef}
							autoComplete="off"
							onChange={(e) => setUser(e.target.value)}
							value={user}
							required
							aria-describedby="uidnote"
							onFocus={() => setUserFocus(true)}
							onBlur={() => setUserFocus(false)}
						/>

						<label htmlFor="password">
							Password:
						</label>
						<input
							type="password"
							id="password"
							onChange={(e) => setPwd(e.target.value)}
							value={pwd}
							required
							aria-describedby="pwdnote"
							onFocus={() => setPwdFocus(true)}
							onBlur={() => setPwdFocus(false)}
						/>

						<label htmlFor="email">
							Email:
						</label>
						<input
							type="text"
							id="email"
							onChange={(e) => setEmail(e.target.value)}
							value={email}
							required
							aria-describedby="emailnote"
							onFocus={() => setEmailFocus(true)}
							onBlur={() => setEmailFocus(false)}
						/>


						<label htmlFor="mobile">
							Mobile:
						</label>
						<input
							type="text"
							id="mobile"
							onChange={(e) => setMobile(e.target.value)}
							value={mobile}
							required
							aria-describedby="mobilenote"
							onFocus={() => setMobileFocus(true)}
							onBlur={() => setMobileFocus(false)}
						/>
						<button>
							Sign Up
						</button>
					</form>
					<p>
						Already registered?
						<br />
						<span className="line">
							<a href="/login">Sign In</a>
						</span>
					</p>
				</section>
			)}
		</>
	);
};

export default Register;
