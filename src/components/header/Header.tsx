import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartbeat, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@material-ui/core';
import './Header.css';

interface HeaderState {
    searchField: string;
}

export default class Header extends React.Component<any, HeaderState> {
    constructor(props: any) {
        super(props);
        this.state = {
            searchField: ''
        };
    }

    render() {
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
                    <div onClick={this.search} className="icon-container">
                        <FontAwesomeIcon
                            icon={faSearch}
                            className='icon search-icon'
                        />
                    </div>
                </div>
            </nav>
        );
    }

    setSearchField = (event: any) => {
        this.setState({
            searchField: event.target.value
        });
    };

    search = () => {
        console.log('search clicked');
    };
}
