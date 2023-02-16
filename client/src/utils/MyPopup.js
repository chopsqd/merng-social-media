import React from 'react';
import {Popup} from "semantic-ui-react";

const MyPopup = ({content, children}) => {
    return <Popup inverted content={content} trigger={children}/>
};

export default MyPopup;