const Login = () => {
	return (
		<div>
			<h1>Login to see all users</h1>
			<input type="text" placeholder="email" />
			<input type="password" placeholder="password" />
			<button>Enter</button>
			<br />
			<br />
			<a href="/reg">Register</a>
		</div>
	);
}

export default Login;