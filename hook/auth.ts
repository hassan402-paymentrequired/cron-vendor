import { useState } from "react";
import { axios } from "../lib/axios";
import { Login, Register, User } from "../constant/types";
import { setToken } from "../lib/store";
import { Alert } from "react-native";

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);

    const register = async (payload: Register) => {
        try {

            const { data } = await axios.post("/auth/register-user", payload)
            console.log(data);
            Alert.alert("success", data.message)
            setToken(data.token)
            
        } catch (error) {
            throw error;
        }
    }

    const login = async (payload: Login) => {
        try {
            const { data } = await axios.post("/auth/login-provider", payload)
            console.log(data);
            setToken(data.token)
            // Alert.alert("success", data.message)
        } catch (error) {
            throw error;
        }

    }


    const verifyAccount = async (code: string) => {
        try {
            const { data } = await axios.post("/auth/verify-account", { code });
            return data;
        } catch (error) {
            throw error
        }
    }


    const loadUser = async () => {
        try {
            const { data } = await axios.get("/auth/user");
            return data;
        } catch (error) {
            throw error;
        }
    }

    return { user, login, register, loadUser, verifyAccount };

}