import React from 'react';

import './picture.sass';
import picture from 'src/styles/assets/toothbrush_toothpaste.jpg';


const Picture = () => {
    return (
        <div class="picture">
            <img
                className="picture-content"
                src={picture}
                alt="pattern of toothbrushes and toothpaste tubes"
            />
        </div>
    )
}

export default Picture;
