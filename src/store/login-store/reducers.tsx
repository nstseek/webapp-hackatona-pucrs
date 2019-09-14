import { RetornoLoginState, LoginAction, LoginActionTypes } from "./actionsTypes";

const initialState: RetornoLoginState = {
    login: null,
    nome: null,
    tipoUsuario: null
}

export default function LoginReducer(state = initialState, action: LoginAction): RetornoLoginState {
    switch(action.type) {
        case LoginActionTypes.SAVE_LOGIN:
            return {
                login: action.payload.login,
                nome: action.payload.nome,
                tipoUsuario: action.payload.tipoUsuario
            };
        default:
            return state;
    }
}