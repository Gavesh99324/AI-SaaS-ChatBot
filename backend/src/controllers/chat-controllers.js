
import { GoogleGenerativeAI } from "@google/generative-ai";
import User from "../models/User.js";

export const generateChatCompletion = async (req, res) => {
    const { message } = req.body;

    try {
        // Ensure user authentication
        const userId = res.locals?.jwtData?.id;
        if (!userId) {
            return res.status(401).json({ message: "User not authenticated or Token malfunctioned" });
        }

        // Fetch user from database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Store user message in chat history (optional)
        user.chats.push({ role: "user", content: message });

        // Initialize Gemini API
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_SECRET_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        // Prepare chat history (optional)
        const chatHistory = user.chats.map(({ role, content }) => ({
            role,
            parts: [{ text: content }]
        }));

        // Get AI response
        const result = await model.generateContent({
            contents: [...chatHistory, { role: "user", parts: [{ text: message }] }]
        });

        const responseText = result.response?.text() || "I'm sorry, I couldn't process that request.";

        // Store AI response in chat history (optional)
        user.chats.push({ role: "assistant", content: responseText });
        await user.save(); // Save updates

        // ✅ Only return the latest AI response instead of the full chat history
        return res.status(200).json({ response: responseText });

    } catch (error) {
        console.error("Chat Generation Error:", error);
        return res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
};


export const sendChatsToUser = async (req, res) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) return res.status(401).json({ message: "User not registered or Token malfunctioned" });

        return res.status(200).json({ message: "OK", name: user.name, email: user.email });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "ERROR", cause: error.message });
    }
};
