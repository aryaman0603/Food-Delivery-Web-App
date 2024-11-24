import foodModel from "../models/foodModel.js";
import fs from 'fs';

// Add Food Items

const addFood = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    let image_filename = `${req.file.filename}`;

    // Create a new food item
    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        category: req.body.category,
        image: image_filename
    });

    try {
        // Save the food item to the database
        await food.save();
        res.json({ success: true, message: "Food Added" });
    } catch (error) {
        console.log(error);
        fs.unlinkSync(`uploads/${image_filename}`);
        res.json({ success: false, message: "Error adding food." });
    }
}

// List Food Items

const listFood = async (req,res) => {
    try {
        const foods = await foodModel.find({})
        res.json({ success: true, data: foods, message: "Food Listed"})
    } catch (error) {
        res.json({ success: false, message: "Error Listing Food"})
    }
}

// Remove Food Items 

const removeFood = async (req,res) => {
    try {
        const food = await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`, ()=>{});

        await foodModel.findByIdAndDelete(req.body.id);
        res.json({ success: true, message: "Food Removed"})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: "Error Removing Food"})
    }
} 


export { addFood, listFood, removeFood };
