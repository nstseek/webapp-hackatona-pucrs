import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Input, Modal } from '@material-ui/core';
import './Header.css';
import { loadingIcon } from '../../types';
import { connect } from 'react-redux';
import { LogUserAction } from '../../store/login-store/actions';
import { TipoUsuario } from '../../store/login-store/actionsTypes';

interface HeaderState {
    searchField: string;
    isModalOpen: boolean;
    isCadastro: boolean;
    isLoading: boolean;
}

interface HeaderProps {
    logUserAction(login: string, tipoUsuario: TipoUsuario, nome: string | null): any;
}

const mapDispatchToProps = (dispatch: any) => {
    logUserAction: (
        login: string,
        tipoUsuario: TipoUsuario,
        nome: string | null = null
    ) => dispatch(LogUserAction(login, tipoUsuario, nome));
};

class Header extends React.Component<null, HeaderState, HeaderProps> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchField: '',
            isModalOpen: false,
            isCadastro: false,
            isLoading: false
        };
    }

    render() {
        const cadastroComponent = {
            cadastro: this.state.isCadastro ? (
                <div className='modal-field-container'>
                    <span className='field-title'>Nome</span>
                    <Input
                        className='modal-field'
                        placeholder='Digite seu nome aqui'
                    />
                </div>
            ) : (
                ''
            ),
            botaoCadastro: !this.state.isCadastro ? (
                <button className='modal-button' onClick={this.mostrarCadastro}>
                    Criar conta
                </button>
            ) : (
                ''
            ),
            botaoCadastrar: this.state.isCadastro ? (
                <button className='modal-button' onClick={this.cadastrar}>
                    Cadastrar
                </button>
            ) : (
                ''
            ),
            botaoLogar: !this.state.isCadastro ? (
                <button className='modal-button' onClick={this.entrar}>
                    Entrar
                </button>
            ) : (
                ''
            )
        };
        const loadingComponent = this.state.isLoading ? loadingIcon : '';
        return (
            <nav className='header'>
                <div className='logo-container'>
                    <FontAwesomeIcon icon={faHeartbeat} className='icon' />
                    <span className='title'>Assistencia medica</span>
                </div>
                <div className='search-bar-container'>
                    <Input
                        className='search-bar'
                        placeholder='Digite um endereço'
                        type='text'
                        onChange={this.setSearchField}
                        disableUnderline={true}
                    />
                    <div onClick={this.search} className='icon-container'>
                        <FontAwesomeIcon
                            icon={faSearch}
                            className='icon search-icon'
                        />
                    </div>
                </div>
                <div className='login-container'>
                    <button className='login-button' onClick={this.openModal}>
                        Você é médico ou da OMS? Clique aqui
                    </button>
                    <Modal
                        aria-labelledby='Login'
                        aria-describedby='Login para credenciados'
                        open={this.state.isModalOpen}
                        onClose={this.closeModal}
                        className='modal-container'>
                        <div className='modal-card'>
                            <div className='modal-title'>
                                <span>Entre com suas credenciais</span>
                            </div>
                            {cadastroComponent.cadastro}
                            <div className='modal-field-container'>
                                <span className='field-title'>CREMERS</span>
                                <Input
                                    className='modal-field'
                                    placeholder='Digite seu CREMERS aqui'
                                />
                            </div>
                            <div className='modal-buttons'>
                                {cadastroComponent.botaoLogar}
                                {cadastroComponent.botaoCadastro}
                                {cadastroComponent.botaoCadastrar}
                            </div>
                        </div>
                    </Modal>
                </div>
                {loadingComponent}
            </nav>
        );
    }

    entrar = async () => {
        this.setState({
            ...this.state,
            isLoading: true
        });
        let result = await fetch('/');
        // result = await result.json();
        this.setState({
            ...this.state,
            isLoading: false
        });
        this.closeModal();
    };

    mostrarCadastro = () => {
        this.setState({
            ...this.state,
            isCadastro: true
        });
    };

    cadastrar = async () => {
        this.setState({
            ...this.state,
            isLoading: true
        });
        let result: any = await fetch('/');
        // result = await result.json();
        this.setState({
            ...this.state,
            isLoading: false
        });
        this.closeModal();
    };

    setSearchField = (event: any) => {
        this.setState({
            searchField: event.target.value
        });
    };

    search = () => {
        console.log('search clicked');
    };

    openModal = () => {
        this.setState({
            ...this.state,
            isModalOpen: true
        });
    };

    closeModal = () => {
        this.setState({
            ...this.state,
            isModalOpen: false,
            isCadastro: false
        });
    };
}

export default connect(
    null,
    mapDispatchToProps
)(Header);
