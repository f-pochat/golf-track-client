import { Wrapper, Status } from "@googlemaps/react-wrapper";
import {useEffect, useRef, useState} from "react";

const render = (status) => {
    return <h1>{status}</h1>;
};

const MapContainer= () => {
    const ref = useRef(null);
    const [map, setMap] = useState();

    useEffect(() => {
        if (ref.current && !map) {
            setMap(new window.google.maps.Map(ref.current, {}));
        }
    }, [ref, map]);

    return <div ref={ref} />
};


<Wrapper apiKey={"AIzaSyAFAwQTRV7PrkkcUBMBTmMok_6OfXeb9Dg"} render={render}>
    <MapContainer/>
</Wrapper>

