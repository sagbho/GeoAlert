import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: { type: String, unique: true, require: true },
  password: { type: String, require: true },
});

const UserModel = mongoose.model("User", UserSchema);

export default UserModel;
