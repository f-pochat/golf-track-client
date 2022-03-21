import {Map,GoogleApiWrapper} from 'google-maps-react'
import {Component} from "react";

class MapContainer extends Component{
    render() {
        return (
            <Map
                google={this.props.google}
                style={{width: "100%", height: "100%"}}
                zoom={10}
                initialCenter={
                    {
                        lat: -34.603683,
                        lng: -34.603683
                    }
                }
            />
        );
    }
}
export default GoogleApiWrapper({
    apiKey:"AIzaSyAFAwQTRV7PrkkcUBMBTmMok_6OfXeb9Dg"
})(MapContainer)