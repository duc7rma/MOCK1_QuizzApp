import { API_LOGOUT_URL, API_REGISTER_URL, API_SIGNIN_URL } from "constants/api-constant";
import { ApiClient } from "./api-client";
import { showToast, toastType } from 'components/toast/toast';
import { LOGOUT_SUCCESS_MESSAGE, REGISTER_SUCCESS_MESSAGE, SIGNIN_SUCCESS_MESSAGE } from "constants/message-constant";

export const signIn = async (payload) => {
    try {
        const response = await ApiClient.post(API_SIGNIN_URL, payload);
        showToast(SIGNIN_SUCCESS_MESSAGE, toastType.success)
        return response.data;
    }
    catch (err) {
        showToast(err.message, toastType.error)
    }

};

export const signUp = async (payload) => {
    try {
        const response = await ApiClient.post(API_REGISTER_URL, payload);
        showToast(REGISTER_SUCCESS_MESSAGE, toastType.success)
        return response.data;
    }
    catch (err) {
        showToast(err.message, toastType.error)
    }

};

export const logOut = async (payload) => {
    const response = await ApiClient.post(API_LOGOUT_URL, payload);
    showToast(LOGOUT_SUCCESS_MESSAGE, toastType.success)
    return response.data;
};