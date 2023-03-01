import { showToast, toastType } from 'components/toast/toast';
import { API_FORGOT_PASSWORD_URL, API_LOGOUT_URL, API_REGISTER_URL, API_SIGNIN_URL } from "constants/api-constant";
import { LOGOUT_SUCCESS_MESSAGE, REGISTER_SUCCESS_MESSAGE, SIGNIN_SUCCESS_MESSAGE } from "constants/message-constant";
import { removeItem } from "utils/storage-utils";
import { EAuthToken } from "variables";
import { ApiClient } from "./api-client";

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
    try {
        const res = await ApiClient.post(API_LOGOUT_URL, payload);
        if (res.data.statusCode === 200) {
            removeItem(EAuthToken.REFRESH_TOKEN);
            removeItem(EAuthToken.ACCESS_TOKEN);
            showToast(LOGOUT_SUCCESS_MESSAGE, toastType.success)
        }
        return res.data;
    }
    catch (err) {
        showToast(err.message, toastType.error)
    }
};

export const forgotPassword = async (payload) => {
    try {
        const res = await ApiClient.post(API_FORGOT_PASSWORD_URL, payload);
        if (res.data.statusCode === 200) {
            showToast(res.data.message, toastType.success)
        }
        return res.data;
    }
    catch (err) {
        showToast(err.message, toastType.error)
    }
};