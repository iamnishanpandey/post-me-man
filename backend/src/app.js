import express, { response } from "express";
import multer from "multer";
import { uploadFile, deleteFile } from "./services/storage.service.js";
import postModel from "./models/post.model.js";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

const upload = multer({ storage: multer.memoryStorage() });

app.post("/create-post", upload.single("image"), async (req, res) => {
  const result = await uploadFile(req.file.buffer);

  const post = await postModel.create({
    image: result.url,
    imageFileId: result.fileId,
    caption: req.body.caption,
  });

  return res.status(201).json({ msg: "post created successfully", post });
});

app.get("/posts", async (req, res) => {
  const posts = await postModel.find({});

  if (posts.length === 0) {
    return res.status(404).json({
      msg: "no posts found",
    });
  }

  res.status(200).json({
    message: "posts fetched",
    post: posts,
  });
});

app.get("/posts/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        msg: "invalid post id",
      });
    }

    const post = await postModel.findById(req.params.id);

    if (!post) {
      res.status(404).json({
        msg: "no post found",
      });
    }

    res.status(200).json({
      message: "post fetched",
      post: post,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      msg: "server error",
    });
  }
});

app.delete("/posts/:id", async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        msg: "invalid post id",
      });
    }

    const _id = req.params.id;
    const result = await postModel.findById(_id);

    if (!result) {
      return res.status(404).json({
        msg: "post not found",
      });
    }

    if (result.imageFileId) {
      await deleteFile(result.imageFileId);
    }

    await postModel.findByIdAndDelete(_id);

    res.status(200).json({
      msg: "post deleted successfully",
    });
  } catch (error) {
    console.error(error);
  }
});

app.patch("/posts/:id", upload.single("image"), async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        msg: "invalid post id",
      });
    }

    const { caption } = req.body;
    const _id = req.params.id;

    const updateData = {};

    if (caption !== undefined) {
      updateData.caption = caption;
    }

    if (req.file) {
      const result = await uploadFile(req.file.buffer);
      updateData.image = result.url;
      updateData.imageFileId = result.fileId;
    }
    const updatedPost = await postModel.findByIdAndUpdate(_id, updateData, {
      new: true,
    });

    if (!updatedPost) {
      return res.status(404).json({
        message: "post not found",
      });
    }

    res.status(200).json({
      message: "post updated",
      post: updatedPost,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: "something went wrong",
      error: error.message,
    });
  }
});

export default app;
