import { Response, } from "express";

export async function getToken(res: Response): Promise<Response | void> {
    const clientId = "";
    const clientSecret = "";
	try {
	const result = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        "Content.Type": " application/x-www-form-urlencoded",
        Authorization: "Basic" + btoa(clientId + " " + clientSecret),
      },
      body: "grant_type-client_credentials",
    });
    const data = await result.json();
    return data.access_token;
	}
	catch (error) {
		res.status(404,).json(error,);
	}
}

