import axios from 'axios';

const ip = process.env.APP_IP_ADDRESS || 'localhost';
const port = process.env.APP_PORT || '8080';
const baseUrl = `http://${ip}:${port}/v1`;

export const LOGIN_URL = `${baseUrl}/auth/login`;
export const REGISTER_URL = `${baseUrl}/auth/register`;
export const DELETE_TODO_URL = `${baseUrl}/todo/item`;
export const GET_TODOS_URL = `${baseUrl}/todo/items`;
export const COMPLETE_TODO_URL = `${baseUrl}/todo/item/`;
export const EDIT_TODO_URL = `${baseUrl}/todo/`;
export const ADD_TODO_URL = `${baseUrl}/todo`;

export async function postWithoutAuth(url, body) {
    try {
        const response = await axios.post(url, body);
        return response;
    } catch (error) {
        return error;
    }
}

export async function postWithAuthReq(url, body) {
    try {
        const response = await axios.post(url, body, {
            headers: getToken()
        });
        return response;
    } catch (error) {
        return error;
    }
}

export async function getWithAuthReq(url) {
    try {
        const response = await axios.get(url, {
            headers: getToken()
        });
        return response;
    } catch (error) {
        return error;
    }
}

export async function deleteWithAuthReq(url, id) {
    try {
        const response = await axios.delete(`${url}/${id}`, {
            headers: getToken()
        });
        return response;
    } catch (error) {
        return error;
    }
}

export async function putWithAuthReq(url, body) {
    try {
        const response = await axios.put(url, body, {
            headers: getToken()
        });
        return response;
    } catch (error) {
        return error;
    }
}

function getToken() {
    const token = localStorage.getItem("token");
    return {
        'Authorization': `Bearer ` + token
    }
}