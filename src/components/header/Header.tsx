import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeartbeat,
    faSearch,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { Input, Modal } from '@material-ui/core';
import './Header.css';
import { loadingIcon } from '../../types';
import * as routes from '../../routes';

interface HeaderState {
    searchField: string;
    isModalOpen: boolean;
    isLoading: boolean;
    usuario: {
        nome: string;
        CREMERS: string;
        senha: string;
    };
}

export default class Header extends React.Component<any, HeaderState> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchField: '',
            isModalOpen: false,
            isLoading: false,
            usuario: { nome: '', CREMERS: '', senha: '' }
        };
    }

    render() {
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
                        Você é médico? Clique aqui
                    </button>
                    <Modal
                        aria-labelledby='Login'
                        aria-describedby='Login para credenciados'
                        open={this.state.isModalOpen}
                        onClose={this.closeModal}
                        className='modal-container'>
                        <div className='modal-card'>
                            <div>
                                <span>Crie sua conta</span>
                            </div>
                            <div className='margin-top-clear'>
                                <span>CREMERS</span>
                                <Input
                                    placeholder='Digite seu número do CREMERS aqui'
                                    onChange={(event: any) =>
                                        this.updateCREMERS(event.target.value)
                                    }
                                    className='input'
                                />
                                <span>Nome</span>
                                <Input
                                    placeholder='Digite seu nome'
                                    onChange={(event: any) =>
                                        this.updateNome(event.target.value)
                                    }
                                    className='input'
                                />
                                <span>Senha</span>
                                <Input
                                    className='input'
                                    placeholder='Crie uma senha'
                                    onChange={(event: any) =>
                                        this.updateSenha(event.target.value)
                                    }
                                />
                            </div>
                            {this.state.isLoading ? (
                                <FontAwesomeIcon
                                    icon={faSpinner}
                                    className='loading-icon-signup fa-spin'
                                />
                            ) : (
                                ''
                            )}
                            <button
                                className='modal-button margin-top-clear'
                                onClick={this.cadastrar}>
                                Cadastrar
                            </button>
                        </div>
                    </Modal>
                </div>
                {loadingComponent}
            </nav>
        );
    }

    updateSenha = (senha: string) => {
        this.setState({
            ...this.state,
            usuario: {
                ...this.state.usuario,
                senha
            }
        });
    };

    updateNome = (nome: string) => {
        this.setState({
            ...this.state,
            usuario: {
                ...this.state.usuario,
                nome
            }
        });
    };

    updateCREMERS = (CREMERS: string) => {
        this.setState({
            ...this.state,
            usuario: {
                ...this.state.usuario,
                CREMERS
            }
        });
    };

    cadastrar = async () => {
        this.setState({
            ...this.state,
            isLoading: true
        });
        let result: any = await fetch(routes.epidemiaRoute);
        // result = await result.json();
        this.setState({
            ...this.state,
            isLoading: false
        });
        this.closeModal();
    };

    setSearchField = (event: any) => {
        this.setState({
            ...this.state,
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
            isModalOpen: false
        });
    };
}
