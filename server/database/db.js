import mongoose from "mongoose";
const Connection = async (username, password) => {
  const URL = `mongodb://${username}:${password}@ac-q6kene3-shard-00-00.wdtxnqy.mongodb.net:27017,ac-q6kene3-shard-00-01.wdtxnqy.mongodb.net:27017,ac-q6kene3-shard-00-02.wdtxnqy.mongodb.net:27017/?ssl=true&replicaSet=atlas-cbf2m8-shard-0&authSource=admin&retryWrites=true&w=majority`;
  try {
    await mongoose.connect(URL, { useNewUrlParser: true });
    console.log("HELLO ARSIL, DATABASE CONNECTED SUCCESSFULLY");
  } catch (err) {
    console.log("ERROR WHILE CONNECTING DATABASE => ", err);
  }
};
export default Connection;
