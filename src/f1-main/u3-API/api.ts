import axios from 'axios';

export const instance = axios.create({
    baseURL: process.env.REACT_APP_BACK_URL || 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const auth = {
    register(email: string, password: string) {
        return instance.post('auth/register', {
            email,
            password,
        }).then(res=>res)
    },
}
