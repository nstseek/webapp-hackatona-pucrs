import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Map, { EpidemiaDoenca } from './components/map/Map';
import InputCard from './components/input-card/InputCard';
import InfoCard from './components/info-card/InfoCard';
import { TipoDoenca } from './components/input-card/InputCard';

export interface AppState {
    mapCoords: {
        lat: number;
        lng: number;
    };
    doencasEpidemias: EpidemiaDoenca[];
    doencas: TipoDoenca[]
}

const startingPointMap = {
    lat: -30.056185,
    lng: -51.172118
};

export default class App extends React.Component<{}, AppState> {
    constructor(props: any) {
        super(props);
        this.state = {
            mapCoords: {
                lat: startingPointMap.lat,
                lng: startingPointMap.lng
            },
            doencasEpidemias: null,
            doencas: null
        };
    }

    render() {
        return (
            <div className='App'>
                <Header setMapCoords={this.setMapCoords} />
                <Map
                    setMapCoords={this.setMapCoords}
                    mapCoords={this.state.mapCoords}
                    setDoencasEpidemias={this.setDoencasEpidemias}
                    doencas={this.state.doencas}
                />
                <InputCard setTipoDoenca={this.setTipoDoenca}/>
                <InfoCard mapCoords={this.state.mapCoords} doencas={this.state.doencas} doencasEpidemias={this.state.doencasEpidemias} />
            </div>
        );
    }

    setTipoDoenca = (doencas: TipoDoenca[]) => {
        this.setState({
            ...this.state,
            doencas
        })
    }

    setDoencasEpidemias = (doencasEpidemias: EpidemiaDoenca[]) => {
        console.log(doencasEpidemias);
        this.setState({
            ...this.state,
            doencasEpidemias
        });
    };

    setMapCoords = (mapCoords: AppState) => {
        this.setState(mapCoords);
    };
}
