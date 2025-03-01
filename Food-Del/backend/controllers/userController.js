import { userModel } from "../models/userModel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"

// login user 

const loginUser = async (req, res) => {

    const {email, password} = req.body;
    try {
        const user = await userModel.findOne({email});
        
        if(!user) {
            return res.json({success: false, message: "User doesn't exist"})
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            return res.json({success: false, message: "Invalid Credentials"})
        }

        const token = createToken(user._id);
        res.json({success: true, token})

    } catch (error) {
        console.log(error)
        res.json({success: false, message: "Error while logging in the user"})
    }

}

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET_KEY)
}

// register user

const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // checking existence of user using email
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // validating email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email address" })
        }

        if (password.length<8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing user password 

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // creating a new user

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword
        })

        // saving the user information in the database

        const user = await newUser.save() 

        // jwt token generation

        const token = createToken(user._id)
        res.json({success:true, token})


    } catch (error) {
        console.log(error)
        res.json({success:false, message: "Error while registering the user"})
    }
}

export { loginUser, registerUser }