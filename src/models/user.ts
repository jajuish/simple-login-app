import { ObjectId } from "mongodb";

// Class Implementation
export default class User {
	constructor(
		public name: string,
		public password: string,
		public email: string,
		public dob: Date,
		public phoneNum: string,
		public id?: ObjectId) { }
}
// TODO: change password from type string into some jwt token thingy