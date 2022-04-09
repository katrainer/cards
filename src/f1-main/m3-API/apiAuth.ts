import {instance} from './apiConfig/apiConfig'
import {AxiosResponse} from 'axios';

export const auth = {
    //Регистрация
    register(data: RegisterType) {
        return instance.post('auth/register', {...data}).then(res => res.data)
    },
    //Войти (логин, в аргумент передаем сразу объект с данными)
    logIn(data: LogInArgsType) {
        return instance.post<any, AxiosResponse<ProfileType>, LogInArgsType>('auth/login', data).then(res => res.data)
    },
    //проверка куки
    me() {
        return instance.post<ProfileType>('auth/me', {}).then(res => res.data)
    },
    //Обновление имени или фото. По дефолту для фото задал стандартное значение (можно фото не предавать)
    updateMe(name: string, avatar: string = 'https//avatar-url.img') {
        return instance.put('auth/me', {name, avatar}).then(res => res.data)
    },
    //Выйти (разлогивание)
    logOut() {
        return instance.delete('auth/me').then(res => res.data)
    },
    //Восстановление пароля
    passwordRecovery(data: PasswordRecoveryType) { //Типизация аргументов запроса могла сломать запрос:D
        return instance.post('auth/forgot', data).then(res => res.data)
    },
    //Задаем новый пароль
    newPassword(password: string, resetPasswordToken: string) {
        return instance.post('auth/set-new-password', {
            password,
            resetPasswordToken
        }).then(res => res.data)
    }
}

//type
export type LogInArgsType = {
    email: string
    password: string
    rememberMe: boolean
}
export type PasswordRecoveryType = {
    email: string // кому восстанавливать пароль
    from: string //"test-front-admin <ai73a@yandex.by>",можно указать разработчика фронта
    message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`
}

export type RegisterType = {
    email: string
    password: string
}

export type ProfileType = {
    _id: string;
    email: string;
    name: string;
    avatar: string;
    publicCardPacksCount: number;
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean;
    rememberMe: boolean;
    error?: string;
}