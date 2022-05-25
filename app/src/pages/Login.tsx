import { useEffect } from "react";
import { useState } from "react";
import { login } from "../api";

import MainPage from "./MainPage";

// NOTE: no text input validation applied
const Login = () => {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showErrorMsg, setShowErrorMsg] = useState({ error: false, message: "" })
	const [showOptions, setShowOptions] = useState(false)
	const [showMainPage, setShowMainPage] = useState(false)

	useEffect(() => {
		localStorage.removeItem("userId");
		setShowOptions(false);
		setShowErrorMsg({ error: false, message: "" });
	}, [email])

	async function handleLogin() {
		const response = await login(email, password)
		if (!response.success) {
			setShowErrorMsg({ error: true, message: response.message || ""})
			setShowOptions(false)
		} else {
			setShowErrorMsg({ error: false, message: ""})
			setShowOptions(true)
		}
	}

	return (
		<>
		{showMainPage ? 
			<MainPage /> : 
			<div>
				<h1>Login to see all users</h1>
			
				<input
					type="text"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.currentTarget.value)}
					required
				/>

				<input
					type="password"
					placeholder="password"
					value={password}
					onChange={(e) => setPassword(e.currentTarget.value)}
					required
				/>

				<button onClick={handleLogin}>Enter</button>
				<br />

				{showErrorMsg.error ? 
					<div style={{color: 'red'}}>
						{showErrorMsg.message}
					</div> : <></>}

				<br />
				<a href="/reg">Register</a>

				<br />
				{showOptions ? <div>
					Successfully logged in.
					<button onClick={() => setShowMainPage(true)}>Show all users</button>
				</div> : <></>}
			</div>}
		</>
	);
}

export default Login;