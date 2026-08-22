import mongoose from "mongoose";

const userSchema = new mongoose.Schema({});

const userModel = mongoose.Model("User", userSchema);

export default userModel;
