import { render } from '@testing-library/react';
import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
//App Components
import Nav from '../src/components/Nav';
import Search from '../src/components/Search';
import NotFound from '../src/components/NotFound';
import PhotoGallery from '../src/components/PhotoGallery'


 class App extends Component {
    constructor() {
      super()
      this.state = {
        photoLists: {
          cat: [],
          dog: [],
          computer: []
        }
      }
    }

    componentDidMount() {
      this.getPhotos('cat');
      this.getPhotos('dog');
      this.getPhotos('computer');

  }


  getPhotos = (query) => {
      console.log(query);
      // Fethcing photos from Flickr API based on the query parameter
      let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=c7b1dba2d6b0bac5cf7e981a9e531177&text=${query}&sort=relevance&per_page=24&format=json&nojsoncallback=1`;
  
      fetch(url)
      .then((response) => response.json())
      .then((data) => {
        //if (query !== 'cat' && query !== 'dog' && query !== 'computer') {
         // this.setState({
          //  search: data.photos.photo
         // })
        //} else {
            // Saving the photo urls to state based on the query passed.

            this.setState(prevState => {
              return(
                {
                  photoLists: {
                    ...prevState.photoLists,
                    [query]: data.photos.photo
                  }
                }
              )
            })
        //}
      })
      .catch(error => {
      console.error('There has been a problem with your fetch operation:', error);
      });
  }

  handleSearch = (query) => {
    this.getPhotos(query);
  }

    render() {

      return(
        <BrowserRouter>
          <div className='app'>
            <Search searchEvent={this.handleSearch}/>
            <Nav />
            <Switch>
                <Route exact path="/" render={() => <PhotoGallery photoList={this.state.photoLists} query='cat'/>} />
                <Route path="/dogs" render={() => <PhotoGallery photoList={this.state.photoLists} query='dog'/>} />
                <Route path="/computers" render={() => <PhotoGallery photoList={this.state.photoLists} query='computer'/>} /> 
                <Route exact path="/search/:q" render={() => <PhotoGallery photoList={this.state.photoLists} query=''/>}/>
                <Route component={NotFound}/>
              </Switch>
          </div>
        </BrowserRouter>
      )
    }
 }

export default App;
