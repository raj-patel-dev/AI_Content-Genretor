import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import User from "../models/User.js";
import ContentHistory from "../models/contentHistory.js";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const AI = new GoogleGenAI({
    apiKey: process.env.API_KEY,
});

export const AIController = asyncHandler(async (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).json({
            message: "Text is required",
        });
    }

    try {
        console.log("Sending request to Gemini...");

        const response = await AI.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                systemInstruction:
                    "Respond in maximum 2 words. Strict output limit: 2 words. Do not exceed two words under any circumstances.",
                maxOutputTokens: 100,
                temperature: 0.3,
            },
        });

        let rawContent = (response.text || "").trim();
        if (!rawContent && response.candidates?.[0]?.content?.parts?.[0]?.text) {
            rawContent = response.candidates[0].content.parts[0].text.trim();
        }

        const words = rawContent.split(/\s+/).filter(Boolean);
        const content = words.length > 0 ? words.slice(0, 2).join(" ") : "Content Generated";

        console.log("Gemini raw text:", JSON.stringify(rawContent));
        console.log("Gemini 2-word output:", JSON.stringify(content));

        if (!content) {
            return res.status(500).json({
                success: false,
                message: "Gemini returned empty content",
            });
        }

        if (req.user?.id) {
            const newContent = await ContentHistory.create({
                user: req.user.id,
                content: content,
            });

            console.log("History saved:", newContent);

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
        console.error("Gemini Error:", error);

        return res.status(500).json({
            success: false,
            message: error.message || "Failed to generate content",
        });
    }
});