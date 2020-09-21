import React, {Component} from 'react';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
//App Components
import Nav from '../src/components/Nav';
import Search from '../src/components/Search';
import NotFound from '../src/components/NotFound';
import PhotoGallery from '../src/components/PhotoGallery';
import RefreshRoute from '../src/components/RefreshRoute';


 class App extends Component {
    constructor() {
      super()
      this.state = {
        photoLists: {
          cat: [],
          dog: [],
          computer: []
        },
        length: 0
      }
    }

    // Setting the default state for the buttons
    componentDidMount() {
      this.getPhotos('cat');
      this.getPhotos('dog');
      this.getPhotos('computer');

  }


  getPhotos = (query, callback) => {
      // Fethcing photos from Flickr API based on the query parameter
      let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c7b1dba2d6b0bac5cf7e981a9e531177&text=${query}&sort=relevance&per_page=24&format=json&nojsoncallback=1`;
      fetch(url)
      .then((response) => response.json())
      .then((data) => {
            this.setState(prevState => {
              return(
                {
                  photoLists: {
                    ...prevState.photoLists,
                    [query]: data.photos.photo
                  },
                  length: prevState.length + 1
                }
              )
            })

            // Checking to see if a call back function has been provided to the function if so call it.
            if(callback && typeof callback === 'function') {
              callback()
            }
      })
      .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      });
  }

    render() {
      // Checking the length property of the object to see if data addition to the default data has been fetched
      let hasData = this.state.length > 3 ? true:false

      return(
        <BrowserRouter>
          <div className='app'>
            <Search searchEvent={this.getPhotos}/>
            <Nav />
            <Switch>
                <Redirect exact from="/" to="/cat"/>
                <Route path="/cat" render={() => <PhotoGallery photoList={this.state.photoLists} query='cat'/>} />
                <Route path="/dog" render={() => <PhotoGallery photoList={this.state.photoLists} query='dog'/>} />
                <Route path="/computer" render={() => <PhotoGallery photoList={this.state.photoLists} query='computer'/>} /> 
                {/** Route for when the search route is refreshed and state is reset */}
                <Route exact path="/search/:q" render={() => <RefreshRoute photoList={this.state.photoLists} hasData={hasData}/>}/>
                <Route component={NotFound}/>
              </Switch>
          </div>
        </BrowserRouter>
      )
    }
 }

export default App;
