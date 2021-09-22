import { createPool, Pool, } from "mysql2/promise";

export async function connect(): Promise<Pool> {
	const connection = await createPool({
		host: "localhost",
		user: "root",
		database: "dbappMusic",
		connectionLimit: 10,
	},);
	console.log("Connected to dbappMusic whit MYSQL",);
	return connection;

}

