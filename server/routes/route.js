import express from "express";
import { newComment, getComments,deleteComment } from "../controller/comment.controller.js";
import {
  createPost,
  getAllPosts,
  getPost,
  updatePost,
  deletePost,
} from "../controller/createpost.controller.js";
import { uploadImage, getImage } from "../controller/image.controller.js";
import { authToken } from "../controller/jwt.controller.js";
import { signupUser, loginUser } from "../controller/user.controller.js";
import upload from "../utils/upload.js";

const router = express.Router();

router.post("/signup", signupUser);
router.post("/login", loginUser);
router.post("/file/upload", upload.single("file"), uploadImage);
router.get("/file/:filename", getImage);
router.post("/create", authToken, createPost);
router.get("/posts", authToken, getAllPosts);
router.get("/post/:id", authToken, getPost);
router.put("/update/:id", authToken, updatePost);
router.delete("/delete/:id", authToken, deletePost);
router.post("/comment/new", authToken, newComment);
router.get("/comments/:id", authToken, getComments);
router.delete('/comment/delete/:id', authToken, deleteComment);
export default router;
