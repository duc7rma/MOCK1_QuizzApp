import { showToast, toastType } from 'components/toast/toast';
import { ApiClient } from "./api-client";

export const fetchAllUserAdmin = async (params) => {
    try {
        const res = await ApiClient.get('user', {
            params: params
        });
        showToast(res.data.message, toastType.success)
        return res.data;
    }
    catch (error) {
        showToast(error.message, toastType.error)
    }
};

export const deleteUserAdmin = async (id) => {
    try {
        const res = await ApiClient.delete(`user/${id}`);
        showToast(res.data.message, toastType.success)

        return res.data;
    }
    catch (error) {
        showToast(error.message, toastType.error)
    }
};

export const updateUserAdmin = async (payload) => {
    try {
        const res = await ApiClient.patch(`user/${payload.id}`, {
            email: payload.email,
            name: payload.name,
            roles: payload.roles,
            avatar_link: payload.avatar_link,
        });
        showToast(res.data.message, toastType.success)

        return res.data;
    }
    catch (error) {
        showToast(error.message, toastType.error)
    }
};

export const getDetailsUserAdmin = async (id) => {
    try {
        const res = await ApiClient.get(`user/${id}`);
        showToast(res.data.message, toastType.success)

        return res.data;
    }
    catch (error) {
        showToast(error.message, toastType.error)
    }
}

export const addUserAdmin = async (payload) => {
    try {
        const res = await ApiClient.post(`user`, payload);
        showToast(res.data.message, toastType.success)

        return res.data;
    }
    catch (error) {
        showToast(error.message, toastType.error)
    }
};


