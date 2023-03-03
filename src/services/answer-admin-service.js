import { showToast, toastType } from 'components/toast/toast';
import { ApiClient } from "./api-client";

export const deleteAnswerAdmin = async (id) => {
    try {
        const res = await ApiClient.delete(`answers/${id}`);
        showToast(res.data.message, toastType.success)

        return res.data;
    }
    catch (error) {
        showToast(error.message, toastType.error)
    }
};

export const updateAnswerAdmin = async (payload) => {
    try {
        const res = await ApiClient.patch(`answers/${payload.id}`, {
            is_correct: payload.is_correct,
            content: payload.content,
        });
        showToast(res.data.message, toastType.success)

        return res.data;
    }
    catch (error) {
        showToast(error.message, toastType.error)
    }
};

export const getDetailsAnswer = async (id) => {
    try {
        const res = await ApiClient.get(`answers/${id}`);
        showToast(res.data.message, toastType.success)

        return res.data;
    }
    catch (error) {
        showToast(error.message, toastType.error)
    }
}

export const addAnswerAdmin = async (payload) => {
    try {
        const res = await ApiClient.post(`answers`, payload);
        showToast(res.data.message, toastType.success)

        return res.data;
    }
    catch (error) {
        showToast(error.message, toastType.error)
    }
};