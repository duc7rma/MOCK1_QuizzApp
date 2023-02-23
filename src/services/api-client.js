import axios from 'axios';

import { RoutePaths } from 'routes/route-constants';
import { API_BASE_URL, API_REFRESH_TOKEN_URL } from 'constants/api-constant';
import { handleStorageToken } from 'utils/storage-utils';
import { EAuthToken } from 'variables';

const axiosInstance = axios.create({ baseURL: API_BASE_URL });
const requestHandler = (config) => {
    const atk = localStorage.getItem(EAuthToken.ACCESS_TOKEN);

    const configHeaders = {
        Authorization: `Bearer ${atk}`,
        ...config.headers,
    };
    config.headers = configHeaders;
    config.params = {
        ...config.params,
        // version: Date.now(),
    };

    return config;
};

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = '') => {
    failedQueue.forEach((prom) => {
        if (error) {
            prom.reject(error);
        } else {
            prom.resolve(token);
        }
    });
    failedQueue = [];
};

const responseErrorHandler = async (err) => {
    const originalRequest = err.config;
    if (err?.response?.status === 401) {
        isRefreshing = true;

        if (isRefreshing) {
            return new Promise(function (resolve, reject) {
                axios
                    .create({ baseURL: API_BASE_URL })
                    .post(API_REFRESH_TOKEN_URL, {
                        refresh_token: localStorage.getItem(EAuthToken.REFRESH_TOKEN),
                    })
                    .then(({ data }) => {
                        axiosInstance.defaults.headers.common['Authorization'] = 'Bearer ' + data.accessToken;
                        originalRequest.headers = {
                            ...originalRequest.headers,
                            Authorization: 'Bearer ' + data.accessToken,
                        };
                        data.accessToken && processQueue(null, data.accessToken);
                        handleStorageToken(data);
                        resolve(window.location.reload());
                    })
                    .catch((err) => {
                        processQueue(err, '');
                        localStorage.clear();
                        window.location.pathname = RoutePaths.SIGN_IN;
                        reject(err);
                    })
                    .then(() => {
                        isRefreshing = false;
                    });
            });
        }
    }

    const data = err?.response?.data;
    const message = data?.message;

    if (message) throw new Error(message);
    return Promise.reject(err);
};

axiosInstance.interceptors.request.use(requestHandler, (err) => Promise.reject(err));
axiosInstance.interceptors.response.use((response) => response, responseErrorHandler);

export { axiosInstance as ApiClient };

