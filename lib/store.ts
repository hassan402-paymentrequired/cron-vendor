import * as SecureStoreOptions from "expo-secure-store"
let token: string | null = null;

export const setToken = async (newToken: string) => {
    token = newToken;

    if (token !== null) {
        await SecureStoreOptions.setItemAsync("token", newToken);
    } else {
        await SecureStoreOptions.deleteItemAsync("token");
    }

}


export const getToken = async () => {

    if (token !== null) {
        return token;
    }

    token = await SecureStoreOptions.getItemAsync("token");
    return token;
}