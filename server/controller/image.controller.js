import { response } from "express";
import grid from "gridfs-stream";
import mongoose from "mongoose";

let gfs, gridfsBucket;
const conn = mongoose.connection;
conn.once("open", () => {
  gridfsBucket = new mongoose.mongo.GridFSBucket(conn.db, {
    bucketName: "fs",
  });
  gfs = grid(conn.db, mongoose.mongo);
  gfs.collection("fs");
});
const url = "http://localhost:8080";
export const uploadImage = (req, res) => {
  if (!req.file) {
    return res.status(404).json({ msg: "File not found" });
  }
  const imageUrl = `${url}/file${req.file.filename}`;
  return res.status(200).json(imageUrl);
};
export const getImage = async (req, res) => {
  try {
    const file = await gfs.files.findOne({ filename: req.params.filename });
    const readStream = gridfsBucket.openDownloadStream(file?._id);
    readStream.pipe(res);
  } catch (err) {
    return response.status(500).json({ msg: err.message });
  }
};
