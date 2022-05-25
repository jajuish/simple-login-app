import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../models/user";
import { authenticateUserRequest, createPasswordHash } from "./services.router";
const cors = require('cors')

// Global Config
export const userRouter = express.Router();
userRouter.use(function (req, res, next) {

	// Website to allow to connect
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

	res.setHeader("Access-Control-Allow-Credentials", "true");

	// Request methods to allow
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	// Request headers to allow
	res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization");

	// Pass to next layer of middleware
	next();
});
userRouter.use(express.json());

// register
userRouter.post("/addNewUser", cors(), async (req: Request, res: Response) => {
	console.log(`Posting /addNewUser`)

	try {
		const email = req.body.email;
		const query = { email };
		const user = (await collections.user.findOne(query)) as any as User;

		if(user !== null) {
			return res.status(201).json({ message: "User with this email already exists"})
		}

		const newUser = req.body as User;
		newUser.password = createPasswordHash(newUser.password)
		const result = await collections.user.insertOne(newUser);

		return result
			? res.status(200).json({ message: `Successfully created a new user` })
			: res.status(500).json({ message: "Failed to create a new user." });
	} catch (error) {
		console.error(error);
		return res.status(400).json({ message: "Please try again" });
	}
});

// login
userRouter.post("/login", async (req: Request, res: Response) => {
	console.log(`Posting /login`)

	try {
		const query = { email: req.body.email, password: createPasswordHash(req.body.password) };
		const user = (await collections.user.findOne(query));

		if (user !== null) {
			return res.status(200).json({ message: "success", id: user._id });
		}
		return res.status(403).json({ message: "Unauthorized or unregistered" })
	} catch (error) {
		console.error(error);
		return res.status(400).json({ message: "Please try again" });
	}
});

// get all users
userRouter.get("/getAllUsers", async (_req: Request, res: Response) => {
	console.log(`Getting /getAllUsers`)
	if (!(await authenticateUserRequest(_req))) {
		return res.status(403).json({ message: "Unauthorized or unregistered" })
	}

	try {
		const users = (await collections.user.find({}).toArray()) as any as User[];
		return res.status(200).json(users.map((user) => { return { name: user.name, email: user.email } }));
	} catch (error) {
		return res.status(500).json({ message: "Please try again later" });
	}
});