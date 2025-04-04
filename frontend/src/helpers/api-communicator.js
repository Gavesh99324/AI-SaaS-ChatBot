import axios from "axios";

const API_BASE_URL = "http://localhost:5000";

export const loginUser = async ( email, password ) => {
    //const res = await axios.post(`${API_BASE_URL}/user/login`, { email, password }, { withCredentials: true });

    const res = await axios.post('/user/login', {email, password});
    if (res.status !== 200) {
        throw new Error("Unable to login");
    }
    const data = await res.data;
    return data;
}

export const checkAuthStatus = async () => {
    const res = await axios.get("/user/auth-status");
    if (res.status !== 200) {
        throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
}

export const sendChatRequest = async (message) => {
    const res = await axios.post("/chat/new", { message });
    if (res.status !== 200) {
        throw new Error("Unable to send chat request");
    }
    const data = await res.data;
    return data;
}
 
export const getUserChats = async () => {
    const res = await axios.get("/chat/all-chats");
    if (res.status !== 200) {
        throw new Error("Unable to send chat request");
    }
    const data = await res.data;
    return data;
}

export const deleteUserChats = async () => {
    const res = await axios.delete("/chat/delete");
    if (res.status !== 200) {
        throw new Error("Unable to delete chats");
    }
    const data = await res.data;
    return data;
}

export const logOutUser = async () => {
    const res = await axios.get("/user/logout");
    if (res.status !== 200) {
        throw new Error("Unable to delete chats");
    }
    const data = await res.data;
    return data;
}
 