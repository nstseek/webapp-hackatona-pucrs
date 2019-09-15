import React from 'react';
import GoogleMapReact from 'google-map-react';
import './Map.css';
import Marker from '../marker/Marker';
import * as routes from '../../routes';
import { loadingIcon } from '../../types';
import { TipoDoenca } from '../input-card/InputCard';

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
    setDoencasEpidemias(doencasEpidemias: EpidemiaDoenca[]): any;
    setMapCoords(mapCoords: any): any;
    doencas: TipoDoenca[];
}

interface MapState {
    epidemias: EpidemiaDoenca[];
    doencas: EpidemiaDoenca[];
    isLoading: boolean;
    lat: number;
    lng: number;
}

export interface EpidemiaDoenca {
    id: number;
    lat: number;
    lng: number;
}

export default class Map extends React.Component<MapProps, MapState> {
    lat: number;
    lng: number;
    mapDidMove: boolean;
    tempData: EpidemiaDoenca[];

    constructor(props: any) {
        super(props);
        this.lat = this.props.mapCoords.lat;
        this.lng = this.props.mapCoords.lng;
        this.mapDidMove = true;
        this.state = {
            epidemias: [],
            doencas: [],
            isLoading: false,
            lat: this.lat,
            lng: this.lng
        };
    }

    componentDidMount = () => {
        this.getEpidemias();
    };

    render() {
        const MarkersEpidemias = this.state.epidemias.map(
            (item: EpidemiaDoenca) => (
                <Marker
                    lat={item.lat}
                    lng={item.lng}
                    text={this.translateId(item)}
                    radius={15 + Math.random()}
                />
            )
        );
        const MarkersDoencas = this.state.doencas.map(
            (item: EpidemiaDoenca) => (
                <Marker
                    lat={item.lat}
                    lng={item.lng}
                    text={this.translateId(item)}
                    radius={1}
                />
            )
        );

        const loadingComponent = this.state.isLoading ? loadingIcon : '';
        return (
            <div style={{ height: '90vh', width: '100%' }}>
                <GoogleMapReact
                    bootstrapURLKeys={mapsKey}
                    defaultZoom={15}
                    defaultCenter={{ lat: this.lat, lng: this.lng }}
                    center={{
                        lat: this.props.mapCoords.lat,
                        lng: this.props.mapCoords.lng
                    }}
                    onDrag={(map: any) => {
                        this.updateLatLng(map.center.lat(), map.center.lng());
                    }}>
                    {MarkersDoencas}
                    {MarkersEpidemias}
                </GoogleMapReact>
                {loadingComponent}
            </div>
        );
    }

    translateId = (doenca: EpidemiaDoenca): string => {
        const result = this.props.doencas.find((tipoDoenca: TipoDoenca) => doenca.id === tipoDoenca.idDoenca);
        return result.nome;
    }

    updateLatLng = (lat: number, lng: number) => {
        this.lat = lat;
        this.lng = lng;
        this.mapDidMove = true;
        this.setState({
            ...this.state,
            lat: this.lat,
            lng: this.lng
        });
    };

    getEpidemias = () => {
        if (this.mapDidMove) {
            console.log('to no epidemias');
            console.log(this.lat, this.lng);
            this.props.setMapCoords({
                mapCoords: { lat: this.lat, lng: this.lng }
            });
            fetch(routes.epidemiasRoute)
                .then((data) => data.json())
                .then((epidemias: EpidemiaDoenca[]) => {
                    console.log(epidemias);
                    this.props.setDoencasEpidemias(epidemias);
                    this.setState({
                        ...this.state,
                        epidemias
                    });
                });
        }
        setTimeout(this.getEpidemias, 5000);
    };
}
