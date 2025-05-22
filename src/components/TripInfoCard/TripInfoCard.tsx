import moment from 'moment';
import './TripInfoCard.css';
import { TripInfo } from '../../types/Trips';
import { tripDuration } from './utils';
import TripInfoLocationCard from './TripInfoLocationCard/TripInfoLocationCard';

type TripInfoCardProps = {
    tripInfo: TripInfo;
};

const TripInfoCard = ({ tripInfo }: TripInfoCardProps) => {
    // Departure Date
    const scheduledDepartureDate = moment(tripInfo.origin.scheduledDepartureTime);

    return (
        <div className="card">
            <div className="card-row">
                <h1>Trip to {tripInfo.destination.region}</h1>
                <h2>{scheduledDepartureDate.format('ddd, DD MMM')}</h2>
            </div>
            <div className="card-row">
                <TripInfoLocationCard
                    description={'Departure'}
                    scheduledDateTimeString={tripInfo.origin.scheduledDepartureTime}
                    estimatedDateTimeString={tripInfo.origin.estimatedDepartureTime}
                    actualDateTimeString={tripInfo.origin.actualDepartureTime}
                    name={tripInfo.origin.name}
                    region={tripInfo.origin.region}
                />
            </div>
            <div className="card-row">
                <p>
                    <strong>Duration: </strong>
                    {tripDuration(tripInfo)}
                </p>
            </div>
            <div className="card-row">
                <TripInfoLocationCard
                    description={'Arrival'}
                    scheduledDateTimeString={tripInfo.destination.scheduledArrivalTime}
                    estimatedDateTimeString={tripInfo.destination.estimatedArrivalTime}
                    actualDateTimeString={tripInfo.destination.actualArrivalTime}
                    name={tripInfo.destination.name}
                    region={tripInfo.destination.region}
                />
            </div>
        </div>
    );
};

export default TripInfoCard;
