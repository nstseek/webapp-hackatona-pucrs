import { LoginAction, LoginActionTypes, TipoUsuario } from "./actionsTypes";

export const LogUserAction = (login: string, tipoUsuario: TipoUsuario, nome: string | null = null): LoginAction => {
    return {
        type: LoginActionTypes.SAVE_LOGIN,
        payload: {
            login,
            tipoUsuario,
            nome
        }
    }
}