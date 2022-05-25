import { useState } from "react";
import { register } from "../api";

// NOTE: no text input validation applied
const Register = () => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	async function registerNewUser() {
		await register(email, password, name);
	}

	return (
		<div>
			<h1>Register</h1>
			<input 
				type="text"
				placeholder="name"
				value={name}
				onChange={(e) => setName(e.currentTarget.value) }
			/>
			<br />

			<input
				type="text"
				placeholder="email"
				value={email}
				onChange={(e) => setEmail(e.currentTarget.value)}
			/>
			<br />

			<input
				type="password"
				placeholder="password"
				value={password}
				onChange={(e) => setPassword(e.currentTarget.value)}
			/>
			<br />

			<button onClick={registerNewUser}>Enter</button>
			<br />

			<br />
			<a href="/">Login</a>
		</div>
	);
}

export default Register;