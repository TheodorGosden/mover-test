import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Map, Marker, GoogleApiWrapper} from 'google-maps-react';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      allCoordinates: []
    }
    this.getDriverLocation = this.getDriverLocation.bind(this);
  }

  //Get the location of the driver form the server
  getDriverLocation = async () =>{
    const response = await fetch(`https://admin-test-mover.azurewebsites.net/api/driverLocationHistory?driverId=6079&fromDate=2018-01-24%2006%3A45&onlySampling=true&toDate=2018-01-24%2007%3A30`, {
      method: 'GET',
      headers: {
          'Authorization': 'UserToken b3ee35bab02c4fa3b96ec8cde7a3dfcf',
          'Content-type': 'application/json'
      }
    }).then(function(response){
      return response.json()
    }).then(function(jsonResponse){
      return jsonResponse
    }).catch(function(response){ 
      console.log(response)
    })

    //Modifies the object to fit to the google maps api and we pass it to state
    let modifiedResponse = []
    for(var i=0; i < response.locations.length; i++){
      modifiedResponse[i] = {
        lng: response.locations[i].longitude,
        lat: response.locations[i].latitude
      }
    }
    this.setState({allCoordinates: modifiedResponse})
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to Mover-test-app</h1>
        </header>
        <button onClick={() => this.getDriverLocation()}>Get driver location</button>
        <Map google={this.props.google} 
          style={style}
          zoom={13}
          initialCenter={{
              lat: 55.71009063720703,
              lng: 12.57758903503418
          }}
        >
          {this.state.allCoordinates.map((locations, index) =>
            <Marker
                key={index}
                name={'Driver'}
                position={{lat:locations, lng: locations}}
            />
          )}
        </Map>
      </div>
    );
  }
}

const style = {
  position: "relative",
  width: '100%',
  height: '600px'
}

export default GoogleApiWrapper({
  apiKey: ("AIzaSyByKCA5FjXE-r1SV5_YLgIY1hXC6BhyZrY")
})(App)
