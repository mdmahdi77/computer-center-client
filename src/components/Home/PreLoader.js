import React from 'react';
import preloader from '../../images/preloader.gif'

const PreLoader = (props) => {
    return (
        <div className="text-center py-5 my-5 col-12" style={{display: props.visibility}}>
            <img src={preloader} alt="" width="400px" />
        </div>
    );
};

export default PreLoader;