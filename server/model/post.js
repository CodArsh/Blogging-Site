import mongoose from "mongoose";
const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  desc: {
    type: String,
    required: true,
  },
  pic: {
    type: String,
    required: false,
  },
  username: {
    type: String,
    required: true,
  },
  categories: {
    type: String,
    required: true,
  },
  createdDate: {
    type: Date,
  },
});

const post = mongoose.model("post", postSchema);
export default post;
