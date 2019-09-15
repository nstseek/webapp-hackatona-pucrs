import React from 'react';
import './InfoCard.css';
import { EpidemiaDoenca } from '../map/Map';
import { TipoDoenca } from '../input-card/InputCard';
import * as routes from '../../routes';

interface Doenca {
    isEpidemia: boolean;
    nome: string;
    quantidade: number;
}

interface InfoCardProps {
    doencasEpidemias: EpidemiaDoenca[];
    doencas: TipoDoenca[];
    mapCoords: any;
}

interface InfoCardState {
    doencasArea: Doenca[];
}

export default class InfoCard extends React.Component<
    InfoCardProps,
    InfoCardState
> {
    constructor(props: InfoCardProps) {
        super(props);
        this.state = {
            doencasArea: null
        };
        this.updateDoencas();
    }

    render() {
        console.log(this.state);
        const doencasEpidemiasComponent = () =>
            this.state.doencasArea
                ? this.state.doencasArea.map((item: Doenca) => {
                      return (
                          <li
                              style={
                                  item.isEpidemia
                                      ? {
                                            backgroundColor: 'red',
                                            color: 'white'
                                        }
                                      : {
                                            backgroundColor: 'transparent',
                                            color: 'black'
                                        }
                              }>
                              {item.nome} - {item.quantidade} caso(s)
                          </li>
                      );
                  })
                : '';
        return (
            <div className='info-card-container'>
                <span>Doenças registradas na sua área</span>
                <ul className='lista'>{doencasEpidemiasComponent()}</ul>
            </div>
        );
    }

    updateDoencas = () => {
        console.log(this.props.mapCoords.lat);
        console.log(this.props.mapCoords.lng);
        fetch(
            routes.epidemiasArea(
                this.props.mapCoords.lat,
                this.props.mapCoords.lng
            )
        )
            .then((data) => data.json())
            .then((doencas: Doenca[]) => {
                console.log(doencas);
                this.setState({ ...this.state, doencasArea: doencas });
            });

        setTimeout(this.updateDoencas, 5000);
    };
}
