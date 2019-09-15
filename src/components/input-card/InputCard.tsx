import React from 'react';
import './InputCard.css';
import Autosuggest from 'react-autosuggest';
import { Input, Radio } from '@material-ui/core';

const LocationIqKey = `d6514e1895bd6c`;
const LocationIqURI = (search: string) =>
    `https://us1.locationiq.com/v1/search.php?key=${encodeURIComponent(
        LocationIqKey
    )}&q=${encodeURIComponent(search)}&format=json&addressdetails=1`;

enum TipoUsuario {
    MEDICO = 0,
    OMS
}

interface InputCardState {
    enderecoField: string;
    enderecosCorrespondentes: LocationIqResponse[];
    enderecoSelecionado: LocationIqResponse | {};
    fieldEdited: boolean;
    sugestoes: string[];
    autosuggestThemeLocal: any;
    tipoUsuario: TipoUsuario;
    CREMERS: string;
    id: string;
    senha: string;
}

interface LocationIqResponse {
    lat: string;
    lon: string;
    display_name: string;
    importante: number;
    address: {
        city: string;
        country: string;
        neighbourhood: string;
        postcode: string;
        road: string;
        state: string;
        suburb: string;
    };
}

export default class InputCard extends React.Component<any, InputCardState> {
    constructor(props: any) {
        super(props);
        this.state = {
            fieldEdited: false,
            enderecoField: '',
            enderecosCorrespondentes: [],
            enderecoSelecionado: {},
            sugestoes: [],
            autosuggestThemeLocal: {
                input: 'autosuggest-input',
                container: 'autosuggest-container',
                suggestionsContainer: 'autosuggest-suggest-container-hide',
                suggestion: 'autosuggest-suggestion'
            },
            tipoUsuario: TipoUsuario.MEDICO,
            senha: '',
            id: '',
            CREMERS: ''
        };
        this.updateAddressList();
    }

    render() {
        return (
            <div className='input-card-container'>
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
                    <span>Localização</span>
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
                </div>
            </div>
        );
    }

    updateUser = (user: TipoUsuario) => {
        this.setState({
            ...this.state,
            tipoUsuario: user
        });
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
