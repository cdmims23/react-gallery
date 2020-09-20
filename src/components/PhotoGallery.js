import React from 'react'
import {withRouter} from 'react-router-dom'
import Photo from './Photo';

const PhotoGallery = (props) => {
    let photos;
    console.log(props.match.params.q)
    console.log(props.photoList[`${props.match.params.q}`]);
    if(props.query) {

        photos = props.photoList[`${props.query}`].map(photo => {
            let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
            return (
                <Photo photoUrl={url} title={photo.title} key={photo.id}/>
            )
        })
    } else {
            let query = props.match.params.q
            console.log(props.photoList[`${query}`]);
        photos = props.photoList[`${query}`].map(photo => {
            let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
            return (
                <Photo photoUrl={url} title={photo.title} key={photo.id}/>
            )
        }) 
    }
    return (
        <div className="photo-container">
            <h2>{`${props.query || props.match.params.q}`}</h2>
            <ul>
                {photos}
            </ul>
        </div>
    )
}

export default withRouter(PhotoGallery);