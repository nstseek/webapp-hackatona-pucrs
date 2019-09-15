import React from 'react';
import './InputCard.css';
import Autosuggest from 'react-autosuggest';
import { Input, Radio } from '@material-ui/core';
import { LocationIqResponse, LocationIqURI } from '../../types';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as routes from '../../routes';

enum TipoUsuario {
    MEDICO = 0,
    OMS
}

interface InputCardProps {
    setTipoDoenca(doencas: TipoDoenca[]): any;
}

interface InputCardState {
    enderecoField: string;
    enderecosCorrespondentes: LocationIqResponse[];
    enderecoSelecionado: LocationIqResponse;
    fieldEdited: boolean;
    sugestoes: string[];
    autosuggestThemeLocal: any;
    tipoUsuario: TipoUsuario;
    CREMERS: string;
    id: string;
    senha: string;
    closed: boolean;
    doencasData: DoencasData;
    threshold: number;
}

interface DoencasData {
    doencas: TipoDoenca[];
    doencasField: string;
    sugestoes: string[];
    doencaSelecionada: TipoDoenca | null | undefined;
    autosuggestTheme: any;
}

export interface TipoDoenca {
    idDoenca: number;
    nome: string;
}

export default class InputCard extends React.Component<
    InputCardProps,
    InputCardState
> {
    constructor(props: any) {
        super(props);
        this.state = {
            fieldEdited: false,
            enderecoField: '',
            enderecosCorrespondentes: [],
            enderecoSelecionado: null,
            sugestoes: [],
            autosuggestThemeLocal: {
                input: 'autosuggest-input localizacao-input',
                container: 'autosuggest-container',
                suggestionsContainer: 'autosuggest-suggest-container-hide',
                suggestion: 'autosuggest-suggestion'
            },
            tipoUsuario: TipoUsuario.MEDICO,
            senha: '',
            id: '',
            CREMERS: '',
            closed: false,
            doencasData: {
                doencaSelecionada: null,
                doencas: [{ idDoenca: 0, nome: '' }],
                sugestoes: [],
                doencasField: '',
                autosuggestTheme: {
                    input: 'autosuggest-input doenca-input',
                    container:
                        'autosuggest-container autosuggest-container-doenca',
                    suggestionsContainer: 'autosuggest-suggest-container-hide',
                    suggestion: 'autosuggest-suggestion'
                }
            },
            threshold: 0
        };
        this.getDoencas();
        this.updateAddressList();
    }

    componentDidMount() {
        const inputDoenca = document.querySelector('.doenca-input');
        const inputLocal = document.querySelector('.localizacao-input');
        const attDoenca = document.createAttribute('placeholder');
        const attLocal = document.createAttribute('placeholder');
        attDoenca.value = 'Digite uma doença para cadastro';
        attLocal.value = 'Digite sua localização';
        if (inputDoenca) {
            inputDoenca.setAttributeNode(attDoenca);
        }
        if (inputLocal) {
            inputLocal.setAttributeNode(attLocal);
        }
    }

    componentDidUpdate() {
        const inputDoenca = document.querySelector('.doenca-input');
        const inputLocal = document.querySelector('.localizacao-input');
        const attDoenca = document.createAttribute('placeholder');
        const attLocal = document.createAttribute('placeholder');
        attDoenca.value = 'Digite uma doença para cadastro';
        attLocal.value = 'Digite sua localização';
        if (inputDoenca) {
            inputDoenca.setAttributeNode(attDoenca);
        }
        if (inputLocal) {
            inputLocal.setAttributeNode(attLocal);
        }
    }

    render() {
        return (
            <div
                className={`input-card-container ${
                    this.state.closed ? 'input-card-hidden' : ''
                }`}>
                {this.state.closed ? (
                    <div
                        className='arrow'
                        onClick={() =>
                            this.setState({
                                ...this.state,
                                closed: false
                            })
                        }>
                        <FontAwesomeIcon icon={faArrowRight} />
                    </div>
                ) : (
                    <div
                        className='arrow'
                        onClick={() =>
                            this.setState({
                                ...this.state,
                                closed: true
                            })
                        }>
                        <FontAwesomeIcon icon={faArrowLeft} />
                    </div>
                )}
                <span className='input-card-title'>
                    Insira seus dados e sintomas abaixo para adicionar ao mapa
                </span>
                <div className='input-field'>
                    <span>Você é:</span>
                    <div className='radio-button-container'>
                        <span>Médico</span>
                        <Radio
                            className='radio-button'
                            checked={
                                this.state.tipoUsuario === TipoUsuario.MEDICO
                            }
                            onChange={(event: any) => {
                                if (event.target.checked) {
                                    this.updateUser(TipoUsuario.MEDICO);
                                }
                            }}
                        />
                    </div>
                    <div className='radio-button-container'>
                        <span>OMS</span>
                        <Radio
                            className='radio-button'
                            checked={this.state.tipoUsuario === TipoUsuario.OMS}
                            onChange={(event: any) => {
                                if (event.target.checked) {
                                    this.updateUser(TipoUsuario.OMS);
                                }
                            }}
                        />
                    </div>
                    {this.authComponent()}
                    {this.state.tipoUsuario === TipoUsuario.MEDICO ? (
                        <span>Localização</span>
                    ) : (
                        ''
                    )}
                    {this.state.tipoUsuario === TipoUsuario.MEDICO ? (
                        <Autosuggest
                            alwaysRenderSuggestions={true}
                            suggestions={this.state.sugestoes}
                            onSuggestionsFetchRequested={this.fieldEdited}
                            getSuggestionValue={(data: string) => data}
                            renderSuggestion={(data: any) => (
                                <span>{data}</span>
                            )}
                            inputProps={{
                                value: this.state.enderecoField,
                                onChange: this.fieldEdited
                            }}
                            id={'1'}
                            theme={this.state.autosuggestThemeLocal}
                        />
                    ) : (
                        ''
                    )}
                    <span>Doença</span>
                    <Autosuggest
                        alwaysRenderSuggestions={true}
                        suggestions={this.state.doencasData.sugestoes}
                        onSuggestionsFetchRequested={this.getSugestoesDoenca}
                        getSuggestionValue={(data: string) => data}
                        renderSuggestion={(data: any) => <span>{data}</span>}
                        inputProps={{
                            value: this.state.doencasData.doencasField,
                            onChange: this.getSugestoesDoenca
                        }}
                        id={'1'}
                        theme={this.state.doencasData.autosuggestTheme}
                    />
                    {this.fieldsComponent()}
                    <button onClick={this.sendData} className='send-button'>
                        Enviar
                    </button>
                </div>
            </div>
        );
    }

    sendData = () => {
        switch (this.state.tipoUsuario) {
            case TipoUsuario.MEDICO:
                console.log(
                    JSON.stringify({
                        cremers: this.state.CREMERS,
                        id_org: null,
                        numeroEpidemia: null,
                        senha: this.state.senha,
                        idDoenca: this.state.doencasData.doencaSelecionada
                            .idDoenca,
                        lat: this.state.enderecoSelecionado.lat,
                        lng: this.state.enderecoSelecionado.lon
                    })
                );
                fetch(routes.enviaDadosInputcard, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        cremers: this.state.CREMERS,
                        id_org: null,
                        numeroEpidemia: null,
                        senha: this.state.senha,
                        idDoenca: this.state.doencasData.doencaSelecionada
                            .idDoenca,
                        lat: this.state.enderecoSelecionado.lat,
                        lng: this.state.enderecoSelecionado.lon
                    })
                });
                break;
            case TipoUsuario.OMS:
                console.log(
                    JSON.stringify({
                        cremers: null,
                        id_org: this.state.id,
                        numeroEpidemia: Number(this.state.threshold),
                        senha: this.state.senha,
                        idDoenca: this.state.doencasData.doencaSelecionada
                            .idDoenca,
                        lat: null,
                        lng: null
                    })
                );
                fetch(routes.enviaDadosInputcard, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        cremers: null,
                        id_org: this.state.id,
                        numeroEpidemia: Number(this.state.threshold),
                        senha: this.state.senha,
                        idDoenca: this.state.doencasData.doencaSelecionada
                            .idDoenca,
                        lat: null,
                        lng: null
                    })
                });
                break;
            default:
                throw new Error('USER NOT DEFINED');
        }
    };

    getSugestoesDoenca = (search: any) => {
        if (
            search.reason === 'input-changed' &&
            (!search.value || search.value.length === 0)
        ) {
            this.setState({
                ...this.state,
                doencasData: {
                    ...this.state.doencasData,
                    sugestoes: [],
                    doencasField: search.value,
                    autosuggestTheme: {
                        ...this.state.doencasData.autosuggestTheme,
                        suggestionsContainer:
                            'autosuggest-suggest-container-hide'
                    }
                }
            });
        } else if (
            !search.value &&
            (search.value && search.value.length === 0)
        ) {
            this.setState({
                ...this.state,
                doencasData: {
                    ...this.state.doencasData,
                    sugestoes: [],
                    doencasField: search.value
                }
            });
        } else if (search.reason === 'suggestion-selected') {
            this.setState({
                ...this.state,
                doencasData: {
                    ...this.state.doencasData,
                    sugestoes: [],
                    doencasField: search.value,
                    doencaSelecionada: this.state.doencasData.doencas.find(
                        (item: TipoDoenca): boolean =>
                            !!(item.nome === search.value)
                    ),
                    autosuggestTheme: {
                        ...this.state.doencasData.autosuggestTheme,
                        suggestionsContainer:
                            'autosuggest-suggest-container-hide'
                    }
                }
            });
        } else if (search.reason === 'input-changed') {
            let arraySugestoes: any = this.state.doencasData.doencas.filter(
                (item: TipoDoenca) => item.nome.indexOf(search.value) !== -1
            );
            arraySugestoes = arraySugestoes.map(
                (item: TipoDoenca) => item.nome
            );
            this.setState({
                ...this.state,
                doencasData: {
                    ...this.state.doencasData,
                    sugestoes: arraySugestoes,
                    doencasField: search.value,
                    autosuggestTheme: {
                        ...this.state.doencasData.autosuggestTheme,
                        suggestionsContainer: 'autosuggest-suggest-container'
                    }
                }
            });
        }
    };

    getDoencas = () => {
        fetch(routes.getDoencas)
            .then((data) => data.json())
            .then((arrayDoencas) => {
                this.props.setTipoDoenca(arrayDoencas);
                this.setState({
                    ...this.state,
                    doencasData: {
                        ...this.state.doencasData,
                        doencas: arrayDoencas,
                        sugestoes: arrayDoencas.map(
                            (item: TipoDoenca) => item.nome
                        )
                    }
                });
            });
    };

    updateThreshold = (threshold: number) => {
        this.setState({
            ...this.state,
            threshold
        });
    };

    updateUser = (user: TipoUsuario) => {
        this.setState({
            ...this.state,
            tipoUsuario: user
        });
    };

    fieldsComponent = () => {
        switch (this.state.tipoUsuario) {
            case TipoUsuario.MEDICO:
                return '';
            case TipoUsuario.OMS:
                return (
                    <div className='input-field-auth'>
                        <span>Limiar de epidemia</span>
                        <Input
                            placeholder='Insira o número de casos para tornar-se uma epidemia'
                            onChange={(event: any) =>
                                this.updateThreshold(event.target.value)
                            }
                            className='input-field'
                        />
                    </div>
                );
            default:
                throw new Error('USER NOT DEFINED');
        }
    };

    authComponent = () => {
        switch (this.state.tipoUsuario) {
            case TipoUsuario.MEDICO:
                return (
                    <div className='input-field-auth margin-top-clear'>
                        <span>CREMERS</span>
                        <Input
                            placeholder='Digite seu número de registro no CREMERS'
                            onChange={this.updateCREMERS}
                            className='input-auth'
                        />
                        <span>Senha</span>
                        <Input
                            placeholder='Digite sua senha'
                            onChange={this.updateSenha}
                            className='input-auth'
                            type='password'
                        />
                    </div>
                );
            case TipoUsuario.OMS:
                return (
                    <div className='input-field-auth margin-top-clear'>
                        <span>ID</span>
                        <Input
                            placeholder='Digite seu ID de organização'
                            onChange={this.updateId}
                            className='input-auth'
                        />
                        <span>Senha</span>
                        <Input
                            placeholder='Digite sua senha'
                            onChange={this.updateSenha}
                            className='input-auth'
                        />
                    </div>
                );
            default:
                throw new Error('USER NOT DEFINED');
        }
    };

    updateSenha = (event: any) => {
        this.setState({
            ...this.state,
            senha: event.target.value
        });
    };

    updateId = (event: any) => {
        this.setState({
            ...this.state,
            id: event.target.value
        });
    };

    updateCREMERS = (event: any) => {
        this.setState({
            ...this.state,
            CREMERS: event.target.value
        });
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
}
