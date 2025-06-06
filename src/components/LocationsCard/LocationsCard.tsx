import moment from 'moment';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { TripInfo, TripStop, TripVehicle } from '../../types/Trips';
import './LocationsCard.css';
import L from 'leaflet';

import busIcon from './assets/bus-location.png';
import locationIcon from './assets/location.png';

const leafletAttribution =
    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const leafletUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';

const mapBusIcon = L.icon({
    iconUrl: busIcon,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40],
});

const mapLocationIcon = L.icon({
    iconUrl: locationIcon,
    iconSize: [40, 40],
    iconAnchor: [12.5, 41],
    popupAnchor: [0, -40],
});

type LocationsCardProps = {
    tripInfo: TripInfo;
    tripVehicle: TripVehicle;
};

const LocationsCard = ({ tripInfo, tripVehicle }: LocationsCardProps) => {
    return (
        <div className="card">
            <div className={'card-row'}>
                <h1>Live Location</h1>
            </div>
            <div className={'card-row'}>
                <MapContainer
                    center={[tripVehicle.location.latitude, tripVehicle.location.longitude]}
                    zoom={13}
                    scrollWheelZoom={false}
                    className={'map-card'}
                >
                    <TileLayer attribution={leafletAttribution} url={leafletUrl} />
                    {tripInfo.stops.map((stop: TripStop, i) => (
                        <Marker
                            key={i}
                            position={[stop.latitude, stop.longitude]}
                            icon={mapLocationIcon}
                        >
                            <Popup>
                                <div>
                                    <span>{stop.name}</span>
                                    <br />
                                    <span>{stop.region}</span>
                                    <br />
                                    <span>{moment(stop.scheduledArrivalTime).format('HH:mm')}</span>
                                </div>
                            </Popup>
                        </Marker>
                    ))}
                    <Marker
                        key={100}
                        position={[tripVehicle.location.latitude, tripVehicle.location.longitude]}
                        icon={mapBusIcon}
                    ></Marker>
                </MapContainer>
            </div>
            <div className={'card-row'}></div>
        </div>
    );
};

export default LocationsCard;
