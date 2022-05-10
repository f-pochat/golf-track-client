import React, {useCallback, useState} from 'react'
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';
import env from "react-dotenv";
import {faMapPin} from "@fortawesome/free-solid-svg-icons";

const containerStyle = {
    width: '500px',
    height: '400px'
};

export function AddHoleMapContainer(props) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: env.MAPS_KEY
    })

    // eslint-disable-next-line no-unused-vars
    const [map, setMap] = useState(null);

    const [marker,setMarker] = useState({
        lat: 0,
        lng: 0,
    })

    /*const [center, setCenter] = useState({
        lat:-35,
        lng:-58,
    })*/

    const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds();
        map.fitBounds(bounds);
        setMap(map)
    }, [])

    const onUnmount = useCallback(function callback(map) {
        setMap(null)
    }, [])

    const pinMarker = {
        path: props.icon.icon[4],
        fillColor: '#fff',
        fillOpacity: 1,
        // eslint-disable-next-line no-undef
        anchor: new google.maps.Point(
            faMapPin.icon[0] / 2, // width
            faMapPin.icon[1] // height
        ),
        scale: 0.075,
    };

    return isLoaded ? (
        <GoogleMap
            onClick={ev => {
                setMarker({
                    lat:ev.latLng.lat(),
                    lng:ev.latLng.lng(),
                });

                props.parentCallback(
                    {
                        lat: ev.latLng.lat(),
                        lng: ev.latLng.lng(),
                    }
                );
            }}
            mapTypeId='satellite'
            mapContainerStyle={containerStyle}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            {marker.lat !== 0 && marker.lng !== 0 ?
                <Marker
                    position={marker}
                    draggable={true}
                    icon={pinMarker}
                />:null}
        </GoogleMap>
    ) : <></>
}

export default React.memo(AddHoleMapContainer);
