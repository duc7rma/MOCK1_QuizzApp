import { API_FETCH_LIST_QUESTIONS_URL } from "constants/api-constant";
import { ApiClient } from "./api-client";
import { showToast, toastType } from 'components/toast/toast';
import { FETCH_LIST_QUESTIONS_SUCCESS_MESSAGE } from "constants/message-constant";

export const fetchListQuestions = async (total) => {
    try {
        const res = await ApiClient.get(API_FETCH_LIST_QUESTIONS_URL + total);
        showToast(FETCH_LIST_QUESTIONS_SUCCESS_MESSAGE, toastType.success)

        return res.data;
    }
    catch (error) {
        showToast(error.message, toastType.error)
    }
};

