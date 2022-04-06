import React, {useState, useCallback, useEffect} from 'react'
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';
import env from "react-dotenv";
import { faMapPin,faCircleDot } from "@fortawesome/free-solid-svg-icons";

const containerStyle = {
    width: '400px',
    height: '350px'
};

export function AddHoleMapContainer(props) {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: env.MAPS_KEY
    })

    const [map, setMap] = useState(null);

    const [marker,setMarker] = useState({
        lat: -35,
        lng: -58,
    })

    const [center, setCenter] = useState({
        lat:-35,
        lng:-58,
    })

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
        fillColor: "#fff",
        fillOpacity: 1,
        // eslint-disable-next-line no-undef
        anchor: new google.maps.Point(
            faMapPin.icon[0] / 2, // width
            faMapPin.icon[1] // height
        ),
        strokeWeight: 1,
        strokeColor: "#ffffff",
        scale: 0.075,
    };

    return isLoaded ? (
        <GoogleMap
            onClick={ev => {
                setCenter({
                    lat:ev.latLng.lat(),
                    lng:ev.latLng.lng(),
                });
                setMarker({
                    lat:ev.latLng.lat(),
                    lng:ev.latLng.lng(),
                });
            }}
            mapTypeId='satellite'
            mapContainerStyle={containerStyle}
            center={center}
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
