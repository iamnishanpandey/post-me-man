import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  image: String,
  imageFileId: String,
  caption: String,
});

const postModel = mongoose.model("post", postSchema);

export default postModel;
