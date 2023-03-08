import { showToast, toastType } from 'components/toast/toast';
import { API_CHANGE_PASSWORD_URL, API_FORGOT_PASSWORD_URL, API_GET_MY_PROFILE_URL, API_LOGOUT_URL, API_REGISTER_URL, API_SIGNIN_URL } from "constants/api-constant";

import { ApiClient } from "./api-client";

export const signIn = async (payload) => {
    try {
        const res = await ApiClient.post(API_SIGNIN_URL, payload);
        showToast(res.data.message, toastType.success)

        return res.data;
    }
    catch (err) {
        showToast(err.message, toastType.error)
    }
};

export const signUp = async (payload) => {
    try {
        const res = await ApiClient.post(API_REGISTER_URL, payload);
        showToast(res.data.message, toastType.success)

        return res.data;
    }
    catch (err) {
        showToast(err.message, toastType.error)
    }
};

export const logOut = async (payload) => {
    try {
        const res = await ApiClient.post(API_LOGOUT_URL, payload);

        showToast(res.data.message, toastType.success)
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

export const getMyProfile = async () => {
    try {
        const res = await ApiClient.get(API_GET_MY_PROFILE_URL);
        showToast(res.data.message, toastType.success)

        return res.data;
    }
    catch (err) {
        showToast(err.message, toastType.error)
    }
};

export const changePassword = async (payload) => {
    try {
        const res = await ApiClient.patch(API_CHANGE_PASSWORD_URL, payload);
        showToast(res.data.message, toastType.success)

        return res.data;
    }
    catch (err) {
        showToast(err.message, toastType.error)
    }
};