import React from 'react'
import {withRouter} from 'react-router-dom'
import Photo from './Photo';

const PhotoGallery = (props) => {

        let photos;
        // Default photo lists will have a query prop to diffrentiate between searched data.
        if(props.query) {
    
            photos = props.photoList[`${props.query}`].map(photo => {
                let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
                return (
                    <Photo photoUrl={url} title={photo.title} key={photo.id}/>
                )
            })
        // Searched data will use the q parameter to set the correct list.
        } else {
                let query = props.match.params.q
                photos = props.photoList[`${query}`].map(photo => {
                    let url = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;
                    return (
                        <Photo photoUrl={url} title={photo.title} key={photo.id}/>
                    )
                }) 
        }
        if(photos.length > 0) {
            return (
                <div className="photo-container">
                    <h2>{`${props.query || props.match.params.q}`}</h2>
                    <ul>
                        {photos}
                    </ul>
                </div>
            )
        } else {
            return (
                <div className="photo-container">
                <h2>{"Sorry, the search didn't return any photos."}</h2>
            </div> 
            )
        }

    
}

// Using withRouter to get access to the match object.
export default withRouter(PhotoGallery);