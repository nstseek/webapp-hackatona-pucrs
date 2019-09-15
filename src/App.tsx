import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Map from './components/map/Map';
import InputCard from './components/input-card/InputCard';

export interface AppState {
    mapCoords: {
        lat: number;
        lng: number;
    };
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
            }
        };
    }

    render() {
        return (
            <div className='App'>
                <Header setMapCoords={this.setMapCoords} />
                <Map mapCoords={this.state.mapCoords} />
                <InputCard />
            </div>
        );
    }

    setMapCoords = (mapCoords: AppState) => {
        this.setState(mapCoords);
    };
}
