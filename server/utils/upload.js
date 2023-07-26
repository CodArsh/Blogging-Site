import { GridFsStorage } from "multer-gridfs-storage";
import dotenv from "dotenv";
import multer from "multer";

// THIS MIDDLEWARE UPLOAD YOUR IMAGE AT MONGODB.
dotenv.config();
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;
const storage = new GridFsStorage({
  url: `mongodb://${username}:${password}@ac-q6kene3-shard-00-00.wdtxnqy.mongodb.net:27017,ac-q6kene3-shard-00-01.wdtxnqy.mongodb.net:27017,ac-q6kene3-shard-00-02.wdtxnqy.mongodb.net:27017/?ssl=true&replicaSet=atlas-cbf2m8-shard-0&authSource=admin&retryWrites=true&w=majority`,
  options: {
    useNewUrlParser: true,
  },
  file: (request, file) => {
    const match = ["image/png", "image/jpg"];
    if (match.indexOf(file.memeType) === -1) {
      return `${Date.now()}-blog-${file.originalname}`;
    }
    return {
      bucketName: "pic",
      filename: `${Date.now()}-blog-${file.originalname}`,
    };
  },
});

export default multer({ storage });
