import { toast } from 'react-toastify';

export const toastStyle = {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
}

export const toastType = {
    success: 'success',
    error: 'error',
    info: 'info',
}

export const showToast = (message, type) => {
    toast[type](message, toastStyle)
}