
import User from "../models/User.js";
import { hash, compare } from "bcrypt";
import { createToken } from "../utils/token-manager.js";

// API request for getting all users from the database
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};

// API request for user signup
export const userSignup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ message: "User already registered" });

        const hashedPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();

        // Create token and store cookie
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie("auth_token", token, {
            path: "/",
            domain: process.env.DOMAIN || "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });

        return res.status(201).json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};

// API request for user login
export const userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ message: "User not registered" });

        const isPasswordCorrect = await compare(password, user.password);
        if (!isPasswordCorrect) return res.status(403).json({ message: "Incorrect Password" });

        // Create token and store cookie
        const token = createToken(user._id.toString(), user.email, "7d");
        const expires = new Date();
        expires.setDate(expires.getDate() + 7);

        res.cookie("auth_token", token, {
            path: "/",
            domain: process.env.DOMAIN || "localhost",
            expires,
            httpOnly: true,
            signed: true,
        });

        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};

// API request to verify user token
export const verifyUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(401).json({ message: "User not registered or Token malfunctioned" });

        if (user.id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission did not match");
        }

        return res.status(200).json({ message: "OK", name: user.name, email: user.email });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};

export const userLogOut = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(401).json({ message: "User not registered or Token malfunctioned" });

        if (user.id.toString() !== res.locals.jwtData.id) {
            return res.status(401).send("Permission did not match");
        }

        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            domain: process.env.DOMAIN || "localhost",
            signed: true,
            path: "/",
        })

        return res.status(200).json({ message: "OK", name: user.name, email: user.email });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
