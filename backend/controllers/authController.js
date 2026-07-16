import jwt from "jsonwebtoken";
import User from "../models/User.js";

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES || "7d",
        }
    );
};

// =======================================
// @desc    Register User
// @route   POST /api/auth/register
// @access  Public
// =======================================
export const register = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;

        // Validate fields
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                error: "Please provide username, email and password",
            });
        }

        // Check if user already exists
        const userExists = await User.findOne({
            $or: [
                { email },
                { username }
            ]
        });

        if (userExists) {
            return res.status(400).json({
                success: false,
                error:
                    userExists.email === email
                        ? "Email already registered"
                        : "Username already taken",
            });
        }

        // Create user
        const user = await User.create({
            username,
            email,
            password,
        });

        // Generate Token
        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profileImage: user.profileImage,
                    createdAt: user.createdAt,
                },
                token,
            },
        });

    } catch (error) {
        next(error);
    }
};


// =======================================
// @desc    Login User
// @route   POST /api/auth/login
// @access  Public
// =======================================
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                error: "Please provide email and password",
                statusCode: 400,
            });
        }

        // Find user with password
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
            return res.status(401).json({
                success: false,
                error: "Invalid email or password",
                statusCode: 401,
            });
        }

        // Compare password
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: "Invalid email or password",
                statusCode: 401,
            });
        }

        // Generate JWT Token
        const token = generateToken(user._id);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    profileImage: user.profileImage,
                    createdAt: user.createdAt,
                },
                token,
            },
        });

    } catch (error) {
        next(error);
    }
};

// =======================================
// @desc    Get Profile
// @route   GET /api/auth/profile
// @access  Private
// =======================================
export const getProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            },
        });

    } catch (error) {
        next(error);
    }
};

// =======================================
// @desc    Update Profile
// @route   PUT /api/auth/profile
// @access  Private
// =======================================
export const updateProfile = async (req, res, next) => {
    try {
        const { username, email, profileImage } = req.body;

        const user = await User.findById(req.user._id);

        if (username) user.username = username;
        if (email) user.email = email;
        if (profileImage) user.profileImage = profileImage;

        await user.save();

        res.status(200).json({
            success: true,
            data: {
                id: user._id,
                username: user.username,
                email: user.email,
                profileImage: user.profileImage,
            },
            message: "Profile updated successfully",
        });
    } catch (error) {
        next(error);
    }
};

// =======================================
// @desc    Change Password
// @route   PUT /api/auth/change-password
// @access  Private
// =======================================
export const changePassword = async (req, res, next) => {
    try {

        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({
                success: false,
                error: "Please provide current password and new password",
                statusCode: 400,
            });
        }

        const user = await User.findById(req.user._id).select('+password');

        // Check current password
        const isMatch = await user.matchPassword(currentPassword);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: "Current password is incorrect",
                statusCode: 401,
            });
        }

        // Update password
        user.password = newPassword;
        await user.save();

        res.status(200).json({
            success: true,
            message: "Password changed successfully",
        });

    } catch (error) {
        next(error);
    }
};