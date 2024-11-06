import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://aryamansharma3319:448948411@cluster0.e5xnz.mongodb.net/Food-Del').then(()=>console.log("DB Connected"));
}