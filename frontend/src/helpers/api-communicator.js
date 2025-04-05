
import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

// Login user function
export const loginUser = async (email, password) => {
    try {
        const res = await axios.post('/user/login', { email, password });
        if (res.status !== 200) {
            throw new Error("Unable to login");
        }
        const data = res.data;
        // Save the token if login is successful
        localStorage.setItem("authToken", data.token); // Assuming the token is returned from the login response
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
        // Save the token if login is successful
        localStorage.setItem("authToken", data.token); // Assuming the token is returned from the login response
        return data;
    } catch (error) {
        console.error("Login error:", error);
        throw new Error("Unable to signup");
    }
}

// Check authentication status function (Handles missing token gracefully)
export const checkAuthStatus = async () => {
    const token = localStorage.getItem("authToken"); // Get the token from localStorage

    // If no token is found, return null (indicating the user is not authenticated)
    if (!token) {
        console.log("No authentication token found");
        return null;
    }

    const config = {
        headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
    };

    try {
        const response = await axios.get("http://localhost:5000/api/v1/user/auth-status", config);
        return response.data; // Return successful response data
    } catch (error) {
        console.error("Error during authentication check:", error);
        return error.response; // Return the error response for further handling
    }
}

// Send chat request
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

// Get all user chats
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

// Delete user chats
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

// Log out user
export const logOutUser = async () => {
    try {
        const res = await axios.get("/user/logout");
        if (res.status !== 200) {
            throw new Error("Unable to log out");
        }
        localStorage.removeItem("authToken"); // Remove the token from localStorage
        return res.data;
    } catch (error) {
        console.error("Logout error:", error);
        throw new Error("Unable to log out");
    }
}
