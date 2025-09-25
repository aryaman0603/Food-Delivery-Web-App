import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect(`mongodb+srv://${process.env.DbUserName}:${process.env.DbPassword}@cluster0.e5xnz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`).then(()=>console.log("DB Connected"));
}
