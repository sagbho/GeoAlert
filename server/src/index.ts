import { config } from "dotenv";
config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import User from "./models/User";

const app = express();
const PORT = 8080;

//Middleware
app.use(express.json());

//Endpoints

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

app.post("/register", async (req: Request, res: Response) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  const createdUser = await user.save();
  res.json(createdUser);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  app.listen(PORT, () => {
    console.log("listening on port ", PORT);
  });
});
