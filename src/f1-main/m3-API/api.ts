import {instance} from './apiConfig/apiConfig'
import {AxiosResponse} from 'axios';

export const auth = {
  //Регистрация
  register(data: RegisterType) {
    return instance.post<RegisterType>("auth/register", data).then((res) => res);
  },
  //Войти (логин, в аргумент передаем сразу объект с данными)
  logIn(data: LogInArgsType) {
    return instance.post<LogInArgsType, AxiosResponse<ProfileType>>("auth/login", data).then((res) => res);
  },
  //проверка куки
  me() {
    return instance.post("auth/me", {}).then((res) => res);
  },
  //Обновление имени или фото. По дефолту для фото задал стандартное значение (можно фото не предавать)
  updateMe(name: string, avatar: string = "https//avatar-url.img") {
    return instance.put("auth/me", { name, avatar }).then((res) => res);
  },
  //Выйти (разлогивание)
  logOut() {
    return instance.delete("auth/me").then((res) => res);
  },
  //Восстановление пароля
  passwordRecovery(data: PasswordRecoveryType) {
    //Типизация аргументов запроса могла сломать запрос:D
    return instance.post("auth/forgot", data).then((res) => res);
  },
  //Задаем новый пароль
  serNewPassword(newPassword: string, resetPasswordToken: string) {
    //Чо за токен я хз
    return instance.post("auth/set-new-password").then((res) => res);
  },
};

//type
type LogInArgsType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type RegisterType = {
  email: string,
  password: string,
  firstName:string,
  lastName:string
};

type PasswordRecoveryType = {
  email: string; // кому восстанавливать пароль
  from: string; //"test-front-admin <ai73a@yandex.by>",можно указать разработчика фронта
  message: `<div style="background-color: lime; padding: 15px">
password recovery link: 
<a href='http://localhost:3000/#/set-new-password/$token$'>
link</a>
</div>`;
};

export type ProfileType = {
    _id: string;
    email: string;
    name: string;
    avatar?: string;
    publicCardPacksCount: number; // количество колод
    created: Date;
    updated: Date;
    isAdmin: boolean;
    verified: boolean; // подтвердил ли почту
    rememberMe: boolean;
}