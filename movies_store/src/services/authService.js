import http from './httpService';
import jwtDecode from 'jwt-decode';

const apiEndPoint = 'auth';
const tokenKey = 'token';

http.setJWT(getJWT());

export async function login(email, password) {
    const obj = {
        email,
        password,
    };
    const { data: jwt } = await http.post(apiEndPoint, obj);
    loginWithJWT(jwt);
}

export function loginWithJWT(jwt) {
    localStorage.setItem(tokenKey, jwt);
}

export function logout() {
    localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
    // check if user has sjon web token/ is logged
    try {
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt); // object with user data getting from json web token
    } catch (error) {
        return null;
    }
}

export function getJWT() {
    return localStorage.getItem(tokenKey);
}

export default { login, loginWithJWT, logout, getCurrentUser, getJWT };
