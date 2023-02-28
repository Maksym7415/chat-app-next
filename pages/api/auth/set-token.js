import { NextApiHandler } from "next";
import cookie from "cookie";

const tokenName = "my-jwt-token";

const handler = async (req, res) => {
	if (req.method === "POST") {
	try {
	const { token } = req.body;
	if (token) {
		// Встановлюємо JWT токен в якості кукі на клієнтській стороні
		res.setHeader(
		  "Set-Cookie",
		  cookie.serialize(tokenName, token, {
			httpOnly: true,
			secure: process.env.NODE_ENV !== "development",
			sameSite: "strict",
			path: "/",
			maxAge: 3600, // Токен дійсний одну годину
		  })
		);
		res.status(200).end();
	  } else {
		res.status(400).send({ message: "Token is required" });
	  }
	} catch (error) {
	  console.error(error);
	  res.status(500).send({ message: "Server error" });
	}
} else {
	res.status(405).send({ message: "Method not allowed" });
	}
	};
	
	export default handler;