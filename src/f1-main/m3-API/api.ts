import {instance} from "./apiConfig/apiConfig";


export const auth = {
    register(email: string, password: string) {
        return instance.post('auth/register', {
            email,
            password,
        }).then(res => res)
    },
    me() {
        return instance.post('auth/me')
    },
    update(name: string, avatar: string) {
        return instance.put('auth/me', {name, avatar})
    }
}
