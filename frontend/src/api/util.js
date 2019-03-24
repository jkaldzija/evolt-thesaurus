import Axios, {AxiosInstance} from 'axios'
import {API_URL} from "../config";

export const apiClient: AxiosInstance = Axios.create({
    baseURL: API_URL
});
