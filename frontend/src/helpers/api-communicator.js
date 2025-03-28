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

