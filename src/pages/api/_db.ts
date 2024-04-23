import mongoose from "mongoose";

export const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
});

export const netflixUser =
  mongoose.models.netflixUser || mongoose.model("netflixUser", userSchema);

const URL =
  "mongodb+srv://udbhav4:OtEQeIGUOx5HOh7Z@cluster0.qcvpegg.mongodb.net/";

let alreadyConnected = false;

export default async function dbConnect() {
  if (alreadyConnected) {
    return "already connected";
  } else {
    if (URL || !(URL === undefined)) {
      await mongoose.connect(URL);
      return "connected to mongoose";
    } else {
      return "invalid URL";
    }
  }
}
