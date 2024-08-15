import { config } from "dotenv";
config();
import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import User from "./models/User";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
const PORT = 8080;

//Middleware
app.use(express.json());

//Endpoints

app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

//GET -- Retrieve User
app.get("/register", async (req: Request, res: Response) => {
  //Fetch all users
  const users = await User.find();
  res.json(users);
});

//POST -- Create User
app.post("/register", async (req: Request, res: Response) => {
  const user = new User({
    email: req.body.email,
    password: req.body.password,
  });
  const createdUser = await user.save();
  res.json(createdUser);
});

//DELETE -- Delete User
app.delete("/register/:userId", async (req: Request, res: Response) => {
  //Retrieve user id
  const userId = req.params.userId;

  //Delete user from mongo
  const user = await User.findByIdAndDelete(userId);
  //Return deleted user to user
  res.json(user);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  app.listen(PORT, () => {
    console.log("listening on port ", PORT);
  });
});
