
import * as jwt from "jsonwebtoken";
import { Request, Response } from "express";
import { createHash } from "crypto"

// pre-handler
export const authenticateUserRequest = async (req: Request) => {
	try {
		const token = req.headers.authorization.split(' ')[1];
		const auth = await verifyJwtServerToken({ token, secret: process.env.JWT_SECRET, algorithm: 'HS512'}) as { userId: string, iat: number, exp: number}

		// right now a constant value for demo purposes, should be replaced later by checking the actual user id from db - using cookies or session storage values
		if (auth.userId === 'someUserId') {
			return true;
		}
		console.log("Unauthorized");
		return false;
	} catch(err) {
		console.log("Unauthorized");
		return false;
	}
}

export const verifyJwtServerToken = ({ token, secret, algorithm }: {
	token: string;
	secret: string;
	algorithm: jwt.Algorithm;
}) => {
	return new Promise(resolve => {
		jwt.verify(token, secret, { algorithms: [algorithm], ignoreExpiration: false }, (err, decoded) => (err ? resolve(null) : resolve(decoded !== null && decoded !== void 0 ? decoded : null)));
	});
};

export const createPasswordHash = (password: string) => {
	const newHash = createHash('sha512')
	const hashedPassword = newHash.update(password).digest('hex')
	return hashedPassword
}