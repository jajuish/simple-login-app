import { useEffect, useState } from "react";
import { getUserList } from "../api";

const MainPage = () => {
	const [users, setUsers] = useState<{ name: string; email: string; }[]>()

	useEffect(() => {
		populateData();
	}, [])

	async function populateData() {
		const response = await getUserList();
		setUsers(response);
	}

	return <>
		<h2>List of users:</h2>
		<h3>Name and email</h3>
		<ul>
			{users?.map((user, index) =>
				<li key={index}>{user.name}: {user.email}</li>
			)}
		</ul>
		<br />
		<a href="/">Back to Login</a>
	</>
}

export default MainPage;