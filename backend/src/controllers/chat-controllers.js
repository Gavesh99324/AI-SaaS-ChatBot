
/*
import OpenAI from "openai";

export const generateChatCompletion = async ( req, res, next ) => {
    const { message } = req.body;
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) 
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });
    
    // grab chats of user
    const chats = user.chats.map(({role, content}) => ({ role, content }));
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });
    
    // send all chats with new one to openAI API
    const config = configureOpenAI();
    const openai = new OpenAIApi(config);

    // get latest response
    const chatResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: chats,
    });
    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: 'Something went wrong'});
    }
};

*/



import { GoogleGenerativeAI } from "@google/generative-ai";

export const generateChatCompletion = async (req, res, next) => {
    const { message } = req.body;

    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user)
            return res
                .status(401)
                .json({ message: "User not registered OR Token malfunctioned" });

        const chats = user.chats.map(({ role, content }) => ({ role, content }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });

        // Initialize Gemini API
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_SECRET_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

        const chat = model.startChat();
        const chatResponse = await chat.sendMessage(message);

        const responseText = chatResponse.response.text(); // Extract response
        user.chats.push({ role: "assistant", content: responseText });

        await user.save();
        return res.status(200).json({ chats: user.chats });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something went wrong" });
    }
};


