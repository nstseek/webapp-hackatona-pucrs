import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

export const loadingIcon = (
    <div className='loading-fader'>
        <div className='loading-icon-container'>
            <FontAwesomeIcon
                icon={faSpinner}
                className='loading-icon fa-spin'
            />
        </div>
    </div>
);

export const LocationIqKey = `d6514e1895bd6c`;
export const LocationIqURI = (search: string) =>
    `https://us1.locationiq.com/v1/search.php?key=${encodeURIComponent(
        LocationIqKey
    )}&q=${encodeURIComponent(search)}&format=json&addressdetails=1`;

export interface LocationIqResponse {
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
