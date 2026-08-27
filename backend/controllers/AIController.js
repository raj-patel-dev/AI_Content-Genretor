import asyncHandler from "express-async-handler";
import axios from "axios";
import dotenv from "dotenv";
import User from "../models/User.js";
import ContentHistory from "../models/contentHistory.js";

dotenv.config();

export const AIController = asyncHandler(async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({
            message: "Text is required",
        });
    }

    try {
        console.log("Sending request to AI API...");

        const response = await axios.post(
            "https://genai.vedshil.com/v1/chat/completions",
            {
                model: "Kryonex-G",
                messages: [
                    {
                        role: "system",
                        content: "You are a helpful AI assistant.",
                    },
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                max_tokens: 100,
                temperature: 1,
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("API Response:", response.data);

        const content =
            response.data?.choices?.[0]?.message?.content?.trim() || "";

        // Save history (optional)
        if (req.user?.id) {
            const newContent = await ContentHistory.create({
                user: req.user?.id,
                content,    
            });
            console.log("History is saved", newContent);
            const userFound = await User.findById(req.user.id);

            if (userFound) {
                userFound.contentHistory.push(newContent._id);
                userFound.apiRequestCount += 1;
                await userFound.save();
            }
        }

        return res.status(200).json({
            success: true,
            content,
        });
    } catch (error) {
        console.error("AI Error:", error.response?.data || error.message);

        return res.status(500).json({
            success: false,
            message:
                error.response?.data?.error?.message ||
                error.response?.data?.message ||
                error.message,
        });
    }
});