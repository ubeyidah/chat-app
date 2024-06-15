import mongoose from "mongoose";

const connectToDb = (url) => {
  mongoose
    .connect(url)
    .then(() => {
      console.log("mongodb connect");
    })
    .catch((err) => {
      console.log(err);
    });
};

export default connectToDb;
