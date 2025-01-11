import Axios from "axios";
import { getToken } from "./store";

export const axios = Axios.create({
    baseURL: 'https://29bf-102-88-71-69.ngrok-free.app/api/v1',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true
});



axios.interceptors.request.use(async (req) => {
    const token = await getToken();

    if (token !== null) {
        req.headers['Authorization'] = `Bearer ${token}`;
    }

    return req
})


