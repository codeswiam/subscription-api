import mongoose from "mongoose";
import User from "../models/user.model.js"

export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({success: true, data: users});
    } catch (error) {
        next(error);
    }
}

export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select('-password'); // all the fields besides the password

        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({success: true, data: user});
    } catch (error) {
        next(error);
    }
}

export const updateUser = async (req, res, next) => {
    const { id } = req.params;
    const user = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: `No user with id: ${id}`});
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(id, user, {new: true});

        res.status(201).json({success: true, data: updateUser});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}

export const deleteUser = async (req, res, next) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success: false, message: `No user with id: ${id}`});
    }

    try {
        await User.findByIdAndDelete(id);

        res.status(201).json({success: true, message: "User deleted successfully"});
    } catch (error) {
        res.status(500).json({success: false, message: error.message});
    }
}