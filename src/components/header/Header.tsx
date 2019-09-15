import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faHeartbeat,
    faSearch,
    faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { Input, Modal } from '@material-ui/core';
import './Header.css';
import { LocationIqResponse, LocationIqURI } from '../../types';
import * as routes from '../../routes';
import Autosuggest from 'react-autosuggest';
import logo from '../../Logo.png';

interface HeaderState {
    searchField: string;
    isModalOpen: boolean;
    isLoading: boolean;
    usuario: {
        nome: string;
        CREMERS: string;
        senha: string;
    };
    enderecoField: string;
    enderecosCorrespondentes: LocationIqResponse[];
    enderecoSelecionado: LocationIqResponse;
    fieldEdited: boolean;
    sugestoes: string[];
    autosuggestThemeLocal: any;
}

interface HeaderProps {
    setMapCoords(mapCoords: any): any;
}

export default class Header extends React.Component<HeaderProps, HeaderState> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchField: '',
            isModalOpen: false,
            isLoading: false,
            usuario: { nome: '', CREMERS: '', senha: '' },
            fieldEdited: false,
            enderecoField: '',
            enderecosCorrespondentes: [],
            enderecoSelecionado: null,
            sugestoes: [],
            autosuggestThemeLocal: {
                input: 'autosuggest-input-header',
                container: 'autosuggest-container',
                suggestionsContainer: 'autosuggest-suggest-container-hide',
                suggestion: 'autosuggest-suggestion'
            }
        };
        this.updateAddressList();
    }

    componentDidMount() {
        const headerInput = document.querySelector(
            '.' + this.state.autosuggestThemeLocal.input
        );
        const att = document.createAttribute('placeholder');
        att.value = 'Digite um endereço';
        if (headerInput) {
            headerInput.setAttributeNode(att);
        }
    }

    render() {
        return (
            <nav className='header'>
                <div className='logo-container'>
                    <img className='logo' src={logo}/>
                    <span className='title'>ASMEE</span>
                </div>
                <div className='search-bar-container'>
                    <Autosuggest
                        alwaysRenderSuggestions={true}
                        suggestions={this.state.sugestoes}
                        onSuggestionsFetchRequested={this.fieldEdited}
                        getSuggestionValue={(data: string) => data}
                        renderSuggestion={(data: any) => <span>{data}</span>}
                        inputProps={{
                            value: this.state.enderecoField,
                            onChange: this.fieldEdited
                        }}
                        id={'1'}
                        theme={this.state.autosuggestThemeLocal}
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
                                    type='password'
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
            </nav>
        );
    }

    updateAddressList = async () => {
        if (this.state.fieldEdited) {
            let response: any = await fetch(
                `${LocationIqURI(this.state.enderecoField)}`
            );
            response = await response.json();
            if (!response.error) {
                let sugestoesArray: string[] = [];
                response.forEach((item: LocationIqResponse) => {
                    sugestoesArray.push(item.display_name);
                });
                this.setState({
                    ...this.state,
                    enderecosCorrespondentes: response,
                    fieldEdited: false,
                    sugestoes: sugestoesArray
                });
            }
        }
        setTimeout(this.updateAddressList, 1000);
    };

    fieldEdited = (search: any) => {
        if (search && search.reason === 'suggestion-selected') {
            const selected: any = this.state.enderecosCorrespondentes.find(
                (item: LocationIqResponse) =>
                    !!(search.value === item.display_name)
            );
            this.setState({
                ...this.state,
                enderecoField: search.value,
                enderecoSelecionado: selected,
                fieldEdited: false,
                autosuggestThemeLocal: {
                    ...this.state.autosuggestThemeLocal,
                    suggestionsContainer: 'autosuggest-suggest-container-hide'
                }
            });
            this.props.setMapCoords({
                mapCoords: {
                    lat: selected.lat,
                    lng: selected.lon
                }
            });
        } else if (
            search &&
            search.value &&
            search.value.length > 10 &&
            search.reason === 'input-changed'
        ) {
            this.setState({
                ...this.state,
                enderecoField: search.value,
                fieldEdited: true,
                autosuggestThemeLocal: {
                    ...this.state.autosuggestThemeLocal,
                    suggestionsContainer: 'autosuggest-suggest-container'
                }
            });
        } else if (search.value && search.value.length <= 10) {
            this.setState({
                ...this.state,
                enderecoField: search.value,
                sugestoes: [],
                autosuggestThemeLocal: {
                    ...this.state.autosuggestThemeLocal,
                    suggestionsContainer: 'autosuggest-suggest-container-hide'
                }
            });
        } else if (!search.value && search.reason === 'input-changed') {
            this.setState({
                ...this.state,
                enderecoField: '',
                sugestoes: [],
                autosuggestThemeLocal: {
                    ...this.state.autosuggestThemeLocal,
                    suggestionsContainer: 'autosuggest-suggest-container-hide'
                }
            });
        } else if (search && search.value) {
            this.setState({
                ...this.state,
                enderecoField: search.value
            });
        }
    };

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
        await fetch(routes.cadastraMedico, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                medico: {
                    id: null,
                    cremers: this.state.usuario.CREMERS,
                    nome: this.state.usuario.nome,
                    senha: this.state.usuario.senha
                }
            })
        });
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
        this.props.setMapCoords({
            mapCoords: {
                lat: Number(this.state.enderecoSelecionado.lat),
                lng: Number(this.state.enderecoSelecionado.lon)
            }
        });
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
