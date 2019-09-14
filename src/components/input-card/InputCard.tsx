import React from 'react';
import './InputCard.css';
import { connect } from 'react-redux';
import { TipoUsuario } from '../../store/login-store/actionsTypes';
import { AppState } from '../..';

interface InputCardProps {
    login: string;
    tipoUsuario: TipoUsuario;
    nome: string;
}

const mapStateToProps = (state: AppState) => {
    login: state.LoginReducer.login;
    tipoUsuario: state.LoginReducer.tipoUsuario;
    nome: state.LoginReducer.nome
}

class InputCard extends React.Component<InputCardProps> {
    constructor(props: InputCardProps) {
        super(props);
    }
    
    render() {
        console.log(this.props);
        return <div />;
    }
}

export default connect<any, any, any, any>(mapStateToProps)(InputCard);
