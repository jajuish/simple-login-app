
// const jwt = require('jsonwebtoken');
import * as jwt from "jsonwebtoken";

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;

const createJwtToken = ({ payload, secret, expiresIn }: {
	payload: { app_name: string };
	secret: string;
	expiresIn: number;
}) => {
	return jwt.sign({ ...payload }, secret, {
			algorithm: 'HS512',
			expiresIn: expiresIn / 1000 // in seconds if numeric
	});
};

let serverToken: string, serverTokenGenTime: number;
export const getJWTServerToken = () => {
  if(!serverToken || ((new Date().getTime() - serverTokenGenTime) > DAY)){
    const secret = String(process.env.JWT_SECRET);
    serverToken = createJwtToken( { payload: {app_name: "app"}, secret, expiresIn: 2*DAY});
    serverTokenGenTime = new Date().getTime();
	}
  return serverToken;
}