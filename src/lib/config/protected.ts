import express from "express";
const app = express();
import jwt from"jsonwebtoken";
import config from "./config";

const routesProtected = express.Router(); 
routesProtected.use((req, res, next,) => {
	const token = config.TOKEN_SECRET;
	if (token) {
		jwt.verify(token, app.get("access-token",), (err: any, decoded:any,) => {      
			if (err) {
				return res.json({ mensaje: "Token inválida", },);    
			} else {
				decoded;    
				next();
			}
		},);
	} else {
		res.status(401,).json({ 
			mensaje: "No Athorized, Please Add Token", 
		},);
	}
},);

export default routesProtected;