import React from 'react';
import './InputCard.css';
import Autosuggest from 'react-autosuggest';

const LocationIqKey = `d6514e1895bd6c`;
const LocationIqURI = (search: string) =>
    `https://us1.locationiq.com/v1/search.php?key=${encodeURIComponent(
        LocationIqKey
    )}&q=${encodeURIComponent(search)}&format=json&addressdetails=1`;

interface InputCardState {
    enderecoField: string;
    enderecosCorrespondentes: LocationIqResponse[];
    enderecoSelecionado: LocationIqResponse | {};
    fieldEdited: boolean;
    sugestoes: string[];
    autosuggestTheme: any;
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
            autosuggestTheme: {
                input: 'autosuggest-input',
                container: 'autosuggest-container',
                suggestionsContainer: 'autosuggest-suggest-container',
                suggestion: 'autosuggest-suggestion'
            }
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
                        theme={this.state.autosuggestTheme}
                    />
                </div>
            </div>
        );
    }

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
                autosuggestTheme: {
                    ...this.state.autosuggestTheme,
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
                autosuggestTheme: {
                    ...this.state.autosuggestTheme,
                    suggestionsContainer: 'autosuggest-suggest-container'
                }
            });
        } else if (!search.value && search.reason === 'input-changed') {
            this.setState({
                ...this.state,
                enderecoField: ''
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
