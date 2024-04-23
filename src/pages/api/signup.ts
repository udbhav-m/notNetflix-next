import { NextApiRequest, NextApiResponse } from "next";
import dbConnect, { netflixUser } from "./_db";

async function SignUp(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method === "POST") {
      await dbConnect();
      const { username, email, password } = req.body;
      let nUser = await netflixUser.findOne({
        username: username,
        email: email,
      });
      if (nUser) {
        res.status(200).json({
          error: "User already exists. Try a different Username or Email.",
        });
      } else {
        let newUser = new netflixUser({ username, email, password });
        await newUser.save();
        res.status(200).json({
          message: "User registered successfully",
        });
      }
    } else {
      res.status(400).json({ error: "Inavlid HTTP request" });
    }
  } catch (error: any) {
    if (error.message.includes("duplicate key error collection")) {
      res.status(500).json({ error: "username/email already taken" });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
}

export default SignUp;
