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