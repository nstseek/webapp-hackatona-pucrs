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

interface MapProps {
    mapCoords: {
        lat: number;
        lng: number;
    };
}

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

export default class Map extends React.Component<MapProps, MapState> {
    lat: number;
    lng: number;
    mapDidMove: boolean;

    constructor(props: any) {
        super(props);
        this.lat = this.props.mapCoords.lat;
        this.lng = this.props.mapCoords.lng;
        this.mapDidMove = true;
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
                    defaultCenter={{ lat: this.lat, lng: this.lng }}
                    onDrag={(map: any) => {
                        this.updateLatLng(map.center.lat(), map.center.lng());
                    }}>
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

    updateLatLng = (lat: number, lng: number) => {
        this.lat = lat;
        this.lng = lng;
        this.mapDidMove = true;
    };

    getEpidemias = async () => {
        if (this.mapDidMove) {
            console.log(this.lat, this.lng);
            this.mapDidMove = false;
            console.log('getEpidemias chamado');
            let result: any = await fetch(routes.epidemiaRoute);
            // enviar this.lat e this.lng
        }
        setTimeout(this.getEpidemias, 1000);
    };
}
