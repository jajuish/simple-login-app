import { useState } from "react";
import { register } from "../api";

// NOTE: no text input validation applied
const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showErrorMsg, setShowErrorMsg] = useState({ error: false, message: "" })

	async function registerNewUser() {
		if (name === "" || email === "" || password === "") {
			setShowErrorMsg({ error: true, message: "All fields are required" })
		} else {
			const response = await register(email, password, name);
			if (!response.success) {
				setShowErrorMsg({ error: true, message: response.message || "" })
			} else {
				setShowErrorMsg({ error: true, message: "Registration successful" })
			}
		}
	}

	return (
		<div>
			<h1>Register</h1>
			<input
				type="text"
				placeholder="name"
				value={name}
				onChange={(e) => setName(e.currentTarget.value)}
				required
			/>
			<br />

			<input
				type="text"
				placeholder="email"
				value={email}
				onChange={(e) => setEmail(e.currentTarget.value)}
				required
			/>
			<br />

			<input
				type="password"
				placeholder="password"
				value={password}
				onChange={(e) => setPassword(e.currentTarget.value)}
				required
			/>
			<br />

			<button onClick={registerNewUser}>Enter</button>
			<br />

			{showErrorMsg.error ?
				<div style={{ color: 'red' }}>
					{showErrorMsg.message}
				</div> : <></>}

			<br />
			<a href="/">Login</a>
		</div>
	);
}

export default Register;