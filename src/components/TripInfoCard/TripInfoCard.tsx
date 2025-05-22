import moment from 'moment';
import './TripInfoCard.css';
import { TripInfo } from '../../types/Trips';
import { isDelayed, tripDuration } from './utils';

type TripInfoCardProps = {
    tripInfo: TripInfo;
};

const TripInfoCard = ({ tripInfo }: TripInfoCardProps) => {
    // Departure Date
    const scheduledDepartureDate = moment(tripInfo.origin.scheduledDepartureTime);
    // Departure Time
    const scheduledDepartureTime = moment(tripInfo.origin.scheduledDepartureTime);
    const estimatedDepartureTime = tripInfo.origin.estimatedDepartureTime
        ? moment(tripInfo.origin.estimatedDepartureTime)
        : undefined;
    const actualDepartureTime = tripInfo.origin.actualDepartureTime
        ? moment(tripInfo.origin.actualDepartureTime)
        : undefined;
    const departureIsDelayed =
        isDelayed(scheduledDepartureTime, estimatedDepartureTime) ||
        isDelayed(scheduledDepartureTime, actualDepartureTime);
    // Arrival Time
    const scheduledArrivalTime = moment(tripInfo.destination.scheduledArrivalTime);
    const estimatedArrivalTime = tripInfo.destination.estimatedArrivalTime
        ? moment(tripInfo.destination.estimatedArrivalTime)
        : undefined;
    const actualArrivalTime = tripInfo.origin.actualArrivalTime
        ? moment(tripInfo.origin.actualArrivalTime)
        : undefined;
    const arrivalIsDelayed =
        isDelayed(scheduledArrivalTime, estimatedArrivalTime) ||
        isDelayed(scheduledArrivalTime, actualArrivalTime);

    return (
        <div className="trip-info-card">
            <div className="trip-info-card-row">
                <h1>Trip to {tripInfo.destination.region}</h1>
                <h3>{scheduledDepartureDate.format('ddd, DD MMM')}</h3>
            </div>
            <div className="trip-info-card-row">
                <p>
                    <span
                        className={
                            departureIsDelayed
                                ? 'trip-info-card-delayed-time'
                                : 'trip-info-card-on-time'
                        }
                    >
                        {scheduledDepartureTime.format('HH:mm')}
                    </span>
                    {departureIsDelayed && (
                        <span className="trip-info-card-estimated-time">
                            {(estimatedDepartureTime || actualDepartureTime).format('HH:mm')}
                        </span>
                    )}
                </p>
                <p>{tripInfo.origin.name}</p>
                <p>{tripInfo.origin.region}</p>
            </div>
            <div className="trip-info-card-row">
                <p>
                    Duration:{' '}
                    {tripDuration(
                        actualDepartureTime || estimatedDepartureTime || scheduledDepartureTime,
                        actualArrivalTime || estimatedArrivalTime || scheduledArrivalTime
                    )}
                </p>
            </div>
            <div className="trip-info-card-row">
                <p>
                    <span
                        className={
                            arrivalIsDelayed
                                ? 'trip-info-card-delayed-time'
                                : 'trip-info-card-on-time'
                        }
                    >
                        {scheduledArrivalTime.format('HH:mm')}
                    </span>
                    {arrivalIsDelayed && (
                        <span className="trip-info-card-estimated-time">
                            {(estimatedArrivalTime || actualArrivalTime).format('HH:mm')}
                        </span>
                    )}
                </p>
                <p>{tripInfo.destination.name}</p>
                <p>{tripInfo.destination.region}</p>
            </div>
        </div>
    );
};

export default TripInfoCard;
