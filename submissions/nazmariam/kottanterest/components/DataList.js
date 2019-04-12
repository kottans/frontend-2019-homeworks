import React from 'react';
import {getPhotos} from '../api'
import ImageList from './ImageList'

async function  onScrollList(event) {
    const scrollBottom = event.target.scrollTop +
        event.target.offsetHeight === event.target.scrollHeight;

    if (scrollBottom) {
        return getPhotos(1); //API method
    }
}

function DataList(props) {
    console.log('---',props);
    // let list = [];
    return (
        <div onScroll={event => {onScrollList(event)}}>
            <ImageList images={props}/>
        </div>
    );
}

export default DataList;
