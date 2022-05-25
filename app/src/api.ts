import { getJWTServerToken } from "./services";

const USER_API_URL = "http://localhost:3002/user/";

export const login = async (username: string, password: string) => {}

export const register = async (email: string, password: string, name: string) => {
	console.log(getJWTServerToken());
	try {
		let res = await fetch(USER_API_URL + "addNewUser", {
			method: 'POST',
			mode: 'cors',
			headers: new Headers({ 
				'Authorization': 'Bearer ' + getJWTServerToken(),
				'Content-Type': 'application/json' 
			}),
			body: JSON.stringify({ name, email, password }),
		});
	} catch(err) {

	}
}