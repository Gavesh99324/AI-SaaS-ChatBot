
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";


export const loginUser = async (email, password) => {
    try {
        const res = await axios.post('/user/login', { email, password });
        if (res.status !== 200) {
            throw new Error("Unable to login");
        }
        const data = res.data;
        
        localStorage.setItem("authToken", data.token);
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw new Error("Unable to login");
    }
}

export const signUpUser = async (name, email, password) => {
    try {
        const res = await axios.post('/user/signup', {name, email, password });
        if (res.status !== 200) {
            throw new Error("Unable to signup");
        }
        const data = res.data;
        
        localStorage.setItem("authToken", data.token); 
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw new Error("Unable to signup");
    }
}


export const checkAuthStatus = async () => {
    const token = localStorage.getItem("authToken"); 

    
    if (!token) {
        console.log("No authentication token found");
        return null;
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`, 
        },
    };

    try {
        const response = await axios.get("http://localhost:5000/api/v1/user/auth-status", config);
        return response.data; 
    } catch (error) {
        console.error("Error during authentication check:", error);
        return error.response; 
    }
}


export const sendChatRequest = async (message) => {
    try {
        const res = await axios.post("/chat/new", { message });
        if (res.status !== 200) {
            throw new Error("Unable to send chat request");
        }
        return res.data;
    } catch (error) {
        console.error("Chat request error:", error);
        throw new Error("Unable to send chat request");
    }
}

export const getUserChats = async () => {
    try {
        const res = await axios.get("/chat/all-chats");
        if (res.status !== 200) {
            throw new Error("Unable to retrieve chats");
        }
        return res.data;
    } catch (error) {
        console.error("Get chats error:", error);
        throw new Error("Unable to retrieve chats");
    }
}


export const deleteUserChats = async () => {
    try {
        const res = await axios.delete("/chat/delete");
        if (res.status !== 200) {
            throw new Error("Unable to delete chats");
        }
        return res.data;
    } catch (error) {
        console.error("Delete chats error:", error);
        throw new Error("Unable to delete chats");
    }
}


export const logOutUser = async () => {
    try {
        const res = await axios.get("/user/logout");
        if (res.status !== 200) {
            throw new Error("Unable to log out");
        }
        localStorage.removeItem("authToken"); 
        return res.data;
    } catch (error) {
        console.error("Logout error:", error);
        throw new Error("Unable to log out");
    }
}
