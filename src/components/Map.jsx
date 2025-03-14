import styles from "./Map.module.css";

import {useNavigate} from "react-router-dom";

import {MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import {useCities} from "../contexts/CitiesContext.jsx";
import {useGeolocation} from "../hooks/useGeolocation.js";
import {useUrlPosition} from "../hooks/useUrlPosition.jsx";
import Button from "./Button.jsx";

const Map = () => {
    const {cities} = useCities();
    const [mapPosition, setMapPosition] = useState([40, 0]);
    const { isLoading: isLoadingPosition, position: geolocationPosition, getPosition } = useGeolocation();

    const [mapLat, mapLng] = useUrlPosition();

    useEffect(() => {
        if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
    }, [mapLat, mapLng]);

    useEffect(() => {
        if (geolocationPosition) setMapPosition([geolocationPosition.lat, geolocationPosition.lng])
    }, [geolocationPosition]);

    return (
        <div className={styles.mapContainer}>
            {!geolocationPosition && <Button type="position" onClick={getPosition}>
                {isLoadingPosition ? "Loading..." : "Use your position"}
            </Button>}
            <MapContainer className={styles.map} center={mapPosition} zoom={7} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map(city => (
                    <Marker position={[city.position.lat, city.position.lng]} key={city.id}>
                        <Popup>
                            <span>{city.emoji}</span>
                            <span>{city.cityName}</span>
                        </Popup>
                    </Marker>
                ))}

                <ChangeCenter position={mapPosition}/>
                <DetectClick/>
            </MapContainer>
        </div>
    );
};

function ChangeCenter({position}) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick() {
    const navigate = useNavigate();

    useMapEvents({
        click: (event) => navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`),
    });
}

export default Map;