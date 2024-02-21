/* global google */
import React, { Component } from "react";
import GoogleMapReact from "google-map-react";

class GoogleMaps extends Component {
  loadMap = (map, maps) => {
    const cityCircle = new maps.Circle({
      strokeColor: "white",
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: "white",
      fillOpacity: 0.35,
      map,
      center: this.props.center,
      radius: 500,
      draggable: false,
    });

    let marker = new maps.Marker({
      position: this.props.center,
      map,
      draggable: true,
    });
    marker.addListener("dragend", (event) => {
      // Get the latitude and longitude from the event object
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();

      cityCircle.setCenter(new google.maps.LatLng(lat, lng));
      if (this.props.setUserLocation) {
        this.props.setUserLocation({ lat, lng });
      }
    });
  };

  render() {
    return (
      <div style={{ height: "400px", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: `${process.env.REACT_APP_GOOLE_MAP_API}` }}
          defaultCenter={this.props.center}
          defaultZoom={10}
          yesIWantToUseGoogleMapApiInternals
          onGoogleApiLoaded={({ map, maps }) => this.loadMap(map, maps)}
        />
      </div>
    );
  }
}

export default GoogleMaps;
