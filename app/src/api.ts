import { getJWTUserToken } from "./services";

const USER_API_URL = "http://localhost:3002/user/";

interface ApiResponse { success: boolean, message?: string};

export const login = async (email: string, password: string): Promise<ApiResponse> => {
	try {
		let res = await fetch(USER_API_URL + "login", {
			method: 'POST',
			headers: new Headers({
				'Content-type': 'application/json',
			}),
			body: JSON.stringify({ email, password }),
		})

		const json = await res.json()
		if (res.status !== 200) {
			const errorMsg = json.message
			return {
				success: false,
				message: errorMsg
			};
		}
		localStorage.setItem("userId", JSON.stringify(json.id))
		return { success: true };
	} catch (err) {
		return {
			success: false,
			message: "Failed"
		}
	}
}

export const register = async (email: string, password: string, name: string): Promise<ApiResponse> => {
	try {
		let res = await fetch(USER_API_URL + "addNewUser", {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			body: JSON.stringify({ name, email, password }),
		});

		if (res.status !== 200) {
			const errorMsg = (await res.json()).message
			return {
				success: false,
				message: errorMsg
			};
		}
		return { success: true };
	} catch (err) {
		return {
			success: false,
			message: "Failed"
		}
	}
}

interface GetUsersResponse { name: string; email: string; };

export const getUserList = async (): Promise<GetUsersResponse[]> => {
	const token = getJWTUserToken();
	try {
		let res = await fetch(USER_API_URL + "getAllUsers", {
			method: 'GET',
			headers: new Headers({
				'Authorization': 'Bearer ' + token,
			}),
		});

		if (res.status !== 200) {
			const errorMsg = (await res.json()).message
			return [];
		}
		return (await res.json()) as GetUsersResponse[];
	} catch (err) {
		return []
	}
}