import { Alert } from "react-native";

export const showAlert = (errors: any) => {
    const formattedErrors = Object.keys(errors)
        .map((field) => {
            const fieldErrors = errors[field].map((err) => `- ${err}`).join('\n');
            return `${field.replace('_', ' ').toUpperCase()}:\n${fieldErrors}`;
        })
        .join('\n\n');

    Alert.alert('Validation Errors', formattedErrors, [{ text: 'OK' }]);
};