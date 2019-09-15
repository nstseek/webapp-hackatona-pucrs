import React from 'react';
import './Marker.css';

interface MarkerProps {
    radius?: number;
    lat: number;
    lng: number;
    text: string;
}

interface MarkerState {
    radius: number;
}

export default class Marker extends React.Component<MarkerProps, any> {
    constructor(props: MarkerProps) {
        super(props);
        if(this.props.radius) {
            this.state = {
                radius: this.props.radius*this.props.radius
            }
        }
        else {
            this.state = {
                radius: 5*5
            }
        }
    }

    render() {
        return (
            <div
                style={{
                    width: 10,
                    height: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 5,
                    backgroundColor: 'red',
                    opacity: 0.5,
                    transform: `scale(${this.props.radius})`
                }}
            >
                <span style={{margin: 0, fontSize: 2.5, color: 'white'}}>{this.props.text}</span>
            </div>
        );
    }
}
