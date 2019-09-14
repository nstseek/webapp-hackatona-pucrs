import React from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.css';
import Marker from '../marker/Marker';
import * as routes from '../../routes';
import { loadingIcon } from '../../types';

const mapsKey = {
    key: `AIzaSyByfiJMAWWpKRXV7rzbVdGpncPEcmHQsbY`,
    language: 'br',
    region: 'br'
};

const startingPointMap = {
    lat: -30.056185,
    lng: -51.172118
};

interface MapState {
    epidemias: Epidemia[];
    isLoading: boolean;
}

interface Epidemia {
    epidemia: TipoEpidemia;
    doenca: string;
    lat: number;
    lng: number;
    radius: number;
}

enum TipoEpidemia {
    EPIDEMIA = 0,
    POSSIVEL_EPIDEMIA
}

export default class Map extends React.Component<any, MapState> {
    constructor(props: any) {
        super(props);
        this.state = {
            epidemias: [],
            isLoading: false
        };
    }

    componentDidMount = () => {
        this.getEpidemias();
    };

    render() {
        const loadingComponent = this.state.isLoading ? loadingIcon : '';
        return (
            <div style={{ height: '90vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={mapsKey}
                    defaultZoom={15}
                    defaultCenter={startingPointMap}>
                    {/* colocar um for fudido */}
                    <Marker
                        lat={-30.056185}
                        lng={-51.172118}
                        text='num sei veio'
                        radius={10}
                    />
                </GoogleMapReact>
                {loadingComponent}
            </div>
        );
    }

    getEpidemias = async () => {
        this.setState({
            ...this.state,
            isLoading: true
        });
        console.log('getEpidemias chamado');
        let result: any = await fetch(routes.epidemiaRoute);
        this.setState({
            ...this.state,
            epidemias: result,
            isLoading: false
        });
    };
}
