import React from 'react';

import './picture.sass';
import picture from 'src/styles/assets/brush.svg';


const Picture = () => {
    return (
        <div className="picture">
            <img
                className="picture-content"
                src={picture}
                alt="pattern of toothbrushes with toothpaste on"
            />
        </div>
    )
}

export default Picture;
