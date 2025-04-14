
import { GoogleGenerativeAI } from "@google/generative-ai";
import axios from "axios";
import User from "../models/User.js";
import { getAPIKey } from "../utils/key-manager.js"; // Import the key manager

export const generateChatCompletion = async (req, res) => {
  const { content: message, model = "gemini" } = req.body;

  try {
    const userId = res.locals?.jwtData?.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated or Token malfunctioned" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.chats.push({ role: "user", content: message });

    let responseText = "";

    if (model === "gemini") {
      const genAI = new GoogleGenerativeAI(getAPIKey("gemini"));
      const geminiModel = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

      const chatHistory = user.chats
        .filter(chat => chat?.content && typeof chat.content === "string")
        .map(({ role, content }) => ({
          role,
          parts: [{ text: content }],
        }));

      const result = await geminiModel.generateContent({
        contents: [...chatHistory, { role: "user", parts: [{ text: message }] }],
      });

      responseText = result?.response?.text() || "Gemini couldn't respond.";

    } else if (model === "deepseek") {
      const deepSeekKey = getAPIKey("deepseek");

      const response = await axios.post(
        "https://api.deepseek.com/v1/chat/completions",
        {
          model: "deepseek-chat",
          messages: [...user.chats, { role: "user", content: message }],
        },
        {
          headers: {
            "Authorization": `Bearer ${deepSeekKey}`,
            "Content-Type": "application/json",
          },
        }
      );

      responseText =
        response.data?.choices?.[0]?.message?.content ||
        "DeepSeek couldn't respond.";

    } else {
      return res.status(400).json({ message: "Unsupported model selected." });
    }

    user.chats.push({ role: "assistant", content: responseText });
    await user.save();

    return res.status(200).json({ response: responseText });

  } catch (error) {
    console.error("Chat Generation Error:", error);
    return res.status(500).json({
      message: "Internal Server Error",
      error: error.message,
      stack: error.stack,
    });
  }
};


export const sendChatsToUser = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).json({ message: "User not registered or Token malfunctioned" });

    return res.status(200).json({ message: "OK", chats: user.chats });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};

export const deleteChats = async (req, res) => {
  try {
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) return res.status(401).json({ message: "User not registered or Token malfunctioned" });

    user.chats = [];
    await user.save();

    return res.status(200).json({ message: "OK" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "ERROR", cause: error.message });
  }
};
