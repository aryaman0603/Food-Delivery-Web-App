import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        password: {
            type: String,
            required: true
        },
        cartData: {
            type: Object,
            default: {}
        }
}, {minimize: false})

export const userModel = mongoose.models.user  || mongoose.model("User", userSchema);