import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import User from "../models/user";

// Global Config
export const userRouter = express.Router();

// userRouter.use(express.json());

// GET
userRouter.get("/", async (_req: Request, res: Response) => {
	console.log(`Getting /`)
	try {
		// const user = (await collections.user.find({}).toArray()) as User[];
		const user = (await collections.user.find({}).toArray());
		console.log(user)

		res.status(200).send(user);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

userRouter.get("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;

	try {

		const query = { _id: new ObjectId(id) };
		// const user = (await collections.user.findOne(query)) as User;
		const user = (await collections.user.findOne(query));

		if (user) {
			res.status(200).send(user);
		}
	} catch (error) {
		res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
	}
});

// POST
userRouter.post("/", async (req: Request, res: Response) => {
	try {
		const newUser = req.body as User;
		const result = await collections.user.insertOne(newUser);

		result
			? res.status(201).send(`Successfully created a new user with id ${result.insertedId}`)
			: res.status(500).send("Failed to create a new user.");
	} catch (error) {
		console.error(error);
		res.status(400).send(error.message);
	}
});

// PUT
userRouter.put("/:id", async (req: Request, res: Response) => {
	const id = req?.params?.id;

	try {
			const updatedUser: User = req.body as User;
			const query = { _id: new ObjectId(id) };
		
			const result = await collections.user.updateOne(query, { $set: updatedUser });

			result
					? res.status(200).send(`Successfully updated user with id ${id}`)
					: res.status(304).send(`User with id: ${id} not updated`);
	} catch (error) {
			console.error(error.message);
			res.status(400).send(error.message);
	}
});

// DELETE