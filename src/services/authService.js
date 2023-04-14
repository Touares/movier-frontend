import axios from "axios";
import jwtDecode from 'jwt-decode';
import http from './httpServices';
import config from '../services/config.json'


export async function  login(username, password) {
    const {data:jwt} = await http.post(config.apiEndpoint +'token/', {username, password});
            localStorage.setItem('token', jwt['access']);
}

export async function  logout() {
    localStorage.removeItem('token');
}

export async function  getCurrentuser() {

    try {
        const jwt = localStorage.getItem("token");
        const userJWt = jwtDecode(jwt);
        const {data:user} = await http.get(config.apiEndpoint +'users/user_pk/' + userJWt.user_id);
        return user;
    } catch (error) {
        return null;
    }
}


export default {
    login,
    logout,
    getCurrentuser
}