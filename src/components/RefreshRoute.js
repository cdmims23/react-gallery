import React from 'react';
import {Route, Redirect} from 'react-router-dom';

import PhotoGallery from './PhotoGallery'

/**
 * Once the refreshed button is pressed the State in App is reset
 * If the user is on the search URL this will result in an error because the data is no longer available
 * If the data is no longer availabe it will redirect back to the cat route.
 * @param {any} props 
 */
const RefreshRoute = (props) => {
    if(props.hasData) {
        return (
            <Route exact path="/search/:q" render={() => <PhotoGallery photoList={props.photoList} query=''/>}/>
        )
    } else {
        return (
            <Redirect exact from="/search/:q" to="/cat"/>
            )
    }

}





export default RefreshRoute;