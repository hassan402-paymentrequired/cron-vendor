import { Service } from "../../constant/types";
import { axios } from "../../lib/axios";
import * as FileSystem from 'expo-file-system';


export const useProvider = () => {
    const AddWorkingHour = async (payload: any) => {
        try {
            const { data } = await axios.post("/provider/working-hour", payload);
            console.log(data);
        } catch (error) {
            throw error;
        }
    }


    const CreateService = async (payload: any) => {
        try {
            const formData = new FormData();

            if (payload.image) {
                const fileInfo = await FileSystem.getInfoAsync(payload.image);
                const fileName = fileInfo.uri.split('/').pop();

                formData.append('image', {
                    uri: payload.image,
                    name: fileName,
                    type: 'image/jpeg',
                });
            }
            formData.append('official_phone_number', payload.official_phone_number);
            formData.append('official_email', payload.official_email);
            formData.append('address', payload.address);


            const { data } = await axios.post('/provider', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            return data;
        } catch (error) {
            throw error;
        }
    };

    const GetServices = async () => {
        try {
            const { data } = await axios.get('/provider/services-offer');
            return data;
        } catch (error) {
            console.error("Error during services fetching:", error);
            throw error;
        }
    };

    const createOffer = async (payload: any) => {
        try {
            const formData = new FormData();

            if (payload.image) {
                const fileInfo = await FileSystem.getInfoAsync(payload.image);
                const fileName = fileInfo.uri.split('/').pop();
                formData.append('image', {
                    uri: payload.image,
                    name: fileName,
                    type: 'image/jpeg',
                });
            }
            formData.append('name', payload.name);
            formData.append('service', payload.service);
            formData.append('description', payload.description);
            formData.append('price', payload.price);
            const { data } = await axios.post("/provider/offer", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return data;
        } catch (error) {
            throw error;
        }
    }



    return {
        AddWorkingHour,
        CreateService,
        createOffer,
        GetServices
    }
}