import axios, { Axios } from "axios";
import { IPost } from '../modals/IPost';
const API_BASE_URL = "http://127.0.0.1:8000/api/";


const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
});
export const getAllPosts = async () => {
    try {
        const result = await axiosInstance.get(`posts`);
        return result;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const geteditPosts = async (id: number) => {
    try {
        const result = await axiosInstance.get(`posts/${id}`);
        return result.data.data;
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const AddPost = async (formData: FormData) => {
    try {
        await axiosInstance.post('addpost', formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Ensure correct content type for FormData
            }
        });
        console.log('post add with success');
    } catch (error: any) {
        console.log((error.response.data.message))
        throw new Error(error.response.data.message);
    }
}
export const posteditPost = async (id: number, formData: FormData) => {
    try {
        await axiosInstance.put(`updatepost/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data' // Ensure correct content type for FormData
            }
        });
        console.log('Update Post success');
    } catch (error: any) {
        throw new Error(error.response.data.message);
    }
}
export const DeletePost = async (id: number) => {
    try {
        await axiosInstance.delete(`removepost/${id}`);
        console.log("Delete Success");
    } catch (err) {
        console.log(err);
    }
};