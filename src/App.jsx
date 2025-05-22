import { useSearchParams } from 'react-router-dom';
import { useTrip } from './hooks/Trips.js';
import TripInfoCard from './components/TripInfoCard/TripInfoCard.tsx';
import TripVehicleCard from './components/TripVehicleCard/TripVehicleCard.tsx';
import './App.css';
import LocationsCard from './components/LocationsCard/LocationsCard.js';
import 'leaflet/dist/leaflet.css';
import ErrorPage from './components/ErrorPage/ErrorPage.js';

function App() {
    const [searchParams] = useSearchParams();
    const trip_uid = searchParams.get('trip_uid');
    const { data, isLoading, error } = useTrip(trip_uid);

    if (isLoading) return <div>Loading...</div>; // this is a placeholder for the loading state
    if (error) return <ErrorPage />;

    const { tripInfo, tripVehicle } = data;

    return (
        <div>
            <TripInfoCard tripInfo={tripInfo} />
            <LocationsCard tripInfo={tripInfo} tripVehicle={tripVehicle} />
            <TripVehicleCard tripVehicle={tripVehicle} />
            <a
                className="icons-attribute-link"
                href="https://www.flaticon.com/authors/boris-farias"
            >
                * Icons by Boris Farias
            </a>
        </div>
    );
}

export default App;
