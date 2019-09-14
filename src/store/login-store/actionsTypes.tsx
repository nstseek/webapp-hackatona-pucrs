export interface RetornoLoginState {
    login: string | null;
    nome: string | null;
    tipoUsuario: TipoUsuario | null;
}

export enum TipoUsuario {
    MEDICO = 0,
    OMS,
    COMUM
}

export enum LoginActionTypes {
    SAVE_LOGIN = 'login/SAVE_LOGIN'
}

export interface LoginAction {
    type: LoginActionTypes;
    payload: RetornoLoginState;
}

interface RequestLogin {
    login: string;
    password: string;
}