import User from '../models/usermodels.js';

export const create = async (req, res) => {
    try {
        const userDetails = new User(req.body);
        const { email } = userDetails;

        const isExist = await User.findOne({ email });
        if (isExist) {
            return res.status(400).json({ message: "User already exists" });
        }

        const newUser = await userDetails.save();
        return res.status(200).json(newUser);
    } catch (error) {
        console.error("Error in create function:", error);  // Log the error for debugging
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const fetch = async (req, res) => {
    try {
        const users = await User.find();
        if (users.length === 0) {
            return res.status(404).json({ message: "No users found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        console.error("Error in fetch function:", error);  // Log the error for debugging
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const findById = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        return res.status(200).json(user);
    } catch (error) {
        console.error("Error in findById function:", error);  // Log the error for debugging
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const update = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);

        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
        return res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error in update function:", error);  // Log the error for debugging
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const remove = async (req, res) => {
    try {
        const id = req.params.id;
        const userExist = await User.findById(id);

        if (!userExist) {
            return res.status(404).json({ message: "User not found" });
        }

        await User.findByIdAndDelete(id);
        return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error in delete function:", error);  // Log the error for debugging
        return res.status(500).json({ error: "Internal server error" });
    }
};