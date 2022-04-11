import React, {useCallback, useState} from 'react'
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';
import env from "react-dotenv";

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

const containerStyle = {
    width: getWindowDimensions().width/3,
    height: getWindowDimensions().height/2,
};

const center = {
    lat: -34.61315,
    lng: -58.37723
};

function AddClubMapContainer(props) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: env.MAPS_KEY
    })

    // eslint-disable-next-line no-unused-vars
    const [map, setMap] = useState(null);
    const [marker,setMarker] = useState({
        lat:0,
        lng:0,
    })

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    return isLoaded ? (
        <GoogleMap
            onClick={ev => {
                setMarker({
                    lat: ev.latLng.lat(),
                    lng: ev.latLng.lng(),
                })

                props.parentCallback(
                    {
                        lat: ev.latLng.lat(),
                        lng: ev.latLng.lng(),
                    }
                );
            }}
            mapTypeId='satellite'
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {marker.lat !== 0 && marker.lng !== 0 ?
                <Marker position={marker}/>:null}
        </GoogleMap>
    ) : <></>
}

export default React.memo(AddClubMapContainer);
