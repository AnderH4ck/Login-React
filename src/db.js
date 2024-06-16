import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://anderperu2005:dJRtQukD5MrfTBcJ@jac.hidhoad.mongodb.net/db_jac?retryWrites=true&w=majority&appName=jac"
    );
    console.log(">>>> BD CONECTADA <<<<");
  } catch (error) {
    console.log(error);
  }
};
