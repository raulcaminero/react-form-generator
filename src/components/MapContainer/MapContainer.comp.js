import { Map, InfoWindow, Marker, GoogleApiWrapper } from 'google-maps-react';
import { observer, inject } from 'mobx-react';
import * as React from 'react';

export class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showingInfoWindow: false,
      activeMarker: {},
      selectedPlace: {
      },
    };
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });

  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  render() {

    return (
      <Map google={this.props.google} zoom={8} initialCenter={{ lat: 18.5357, lng: -69.9627 }}
        onClick={this.onMapClicked}>

        {this.props.mobxStore.items['Map' + this.props.title] && this.props.mobxStore.items['Map' + this.props.title].map(x => {
          return (
            <Marker
              onClick={this.onMarkerClick}
              key={x.Latitud + x.Longitud}
              title={x.InfoTitulo}
              detail={x.InfoTitulo + x.InfoDetalle}
              position={{ lat: x.Latitud, lng: x.Longitud }}
            >

            </Marker>


          )
        })}
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
           <div dangerouslySetInnerHTML={ {__html: this.state.selectedPlace.detail}} />
        
        </InfoWindow>

      </Map>
    );
  }
}

export default inject("mobxStore")(observer(GoogleApiWrapper({
  apiKey: ('AIzaSyDm2ZWnRbFVKc29jMXptuA9KAZPLtXYado')
})(MapContainer)));
