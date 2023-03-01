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

