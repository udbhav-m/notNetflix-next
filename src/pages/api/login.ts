import type { NextApiRequest, NextApiResponse } from "next";
import dbConnect, { netflixUser } from "./_db";

interface body {
  email: string;
  password: string;
}

export default async function login(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      await dbConnect();
      let { email, password }: body = req.body;
      if (!(email.length > 4 && password.length > 4)) {
        res.status(400).json({ error: "Invalid details" });
      } else {
        let user = await netflixUser.findOne({
          email: email,
          password: password,
        });
        if (!user) {
          res.status(400).json({ error: "User with email does not exist" });
        } else if (user.password != password) {
          res.status(400).json({ error: "Invalid password" });
        } else {
          res.status(200).json({ message: "User logged in" });
        }
      }
    } else {
      res.status(400).json({ error: "Invalid HTTP request" });
    }
  } catch (error: any) {
    if (error.message.includes("duplicate key error collection")) {
      res.status(500).json({ error: "username/email already taken" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}
