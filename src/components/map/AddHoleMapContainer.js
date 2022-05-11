import React, {useCallback, useState} from 'react'
import {GoogleMap, Marker, useJsApiLoader} from '@react-google-maps/api';
import env from "react-dotenv";
import {faMapPin} from "@fortawesome/free-solid-svg-icons";

const containerStyle = {
    width: '500px',
    height: '400px'
};

export function AddHoleMapContainer(props) {
    const course = props.course;
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: env.MAPS_KEY
    })

    // eslint-disable-next-line no-unused-vars
    const [map, setMap] = useState(null);

    const [marker,setMarker] = useState(props.usage === "teebox" ?
        {lat: parseFloat(course.holesList[props.hole - 1].locationTeebox.lat), lng: parseFloat(course.holesList[props.hole - 1].locationTeebox.lng)} :
        {lat: parseFloat(course.holesList[props.hole - 1].locationMidOfGreen.lat), lng: parseFloat(course.holesList[props.hole - 1].locationMidOfGreen.lng)})

    const centerMap = props.usage === "teebox" ? course.holesList[props.hole - 1].locationTeebox : course.holesList[props.hole - 1].locationMidOfGreen;

    const onLoad = useCallback(function callback(map) {
        console.log(centerMap);
        let bounds = new window.google.maps.LatLngBounds(
            new window.google.maps.LatLng(parseFloat(centerMap.lat)-0.001, parseFloat(centerMap.lng)-0.001),           // top left corner of map
            new window.google.maps.LatLng(parseFloat(centerMap.lat)+0.001, parseFloat(centerMap.lng)+0.001));
        if (centerMap.lat === 0 && centerMap.lng === 0){
            bounds = new window.google.maps.LatLngBounds(
                new window.google.maps.LatLng(props.course.clubHouseLocation.lat-0.001, props.course.clubHouseLocation.lng-0.001),           // top left corner of map
                new window.google.maps.LatLng(props.course.clubHouseLocation.lat+0.001, props.course.clubHouseLocation.lng+0.001));

        }
        console.log(bounds);
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
            onLoad={onLoad}
            onUnmount={onUnmount}
            defaultZoom={8}
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
