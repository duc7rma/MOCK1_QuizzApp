import { showToast, toastType } from 'components/toast/toast';
import { API_FETCH_ALL_QUESTIONS_ADMIN_URL } from "constants/api-constant";
import { ApiClient } from "./api-client";

export const fetchAllQuestionsAdmin = async (params) => {
    try {
        const res = await ApiClient.get(API_FETCH_ALL_QUESTIONS_ADMIN_URL, {
            params: params
        });
        showToast(res.data.message, toastType.success)
        return res.data;
    }
    catch (error) {
        showToast(error.message, toastType.error)
    }
};

export const deleteQuestionsAdmin = async (id) => {
    try {
        const res = await ApiClient.delete(`questions/${id}`);
        showToast(res.data.message, toastType.success)

        return res.data;
    }
    catch (error) {
        showToast(error.message, toastType.error)
    }
};

export const updateQuestionsAdmin = async (payload) => {
    try {
        const res = await ApiClient.patch(`questions/${payload.id}`, {
            title: payload.title,
            thumbnail_link: payload.thumbnail_link,
        });
        showToast(res.data.message, toastType.success)

        return res.data;
    }
    catch (error) {
        showToast(error.message, toastType.error)
    }
};

export const getDetailsQuestionAdmin = async (id) => {
    try {
        const res = await ApiClient.get(`questions/${id}`);
        showToast(res.data.message, toastType.success)

        return res.data;
    }
    catch (error) {
        showToast(error.message, toastType.error)
    }
}

export const addQuestionsAdmin = async (payload) => {
    try {
        const res = await ApiClient.post(`questions`, payload);
        showToast(res.data.message, toastType.success)

        return res.data;
    }
    catch (error) {
        showToast(error.message, toastType.error)
    }
};


