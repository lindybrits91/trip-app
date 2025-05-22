import { isDelayed } from '../utils';
import moment from 'moment';

import './TripInfoLocationCard.css';

type LocationCardProps = {
    description: string;
    scheduledDateTimeString: string;
    estimatedDateTimeString?: string;
    actualDateTimeString?: string;
    name: string;
    region: string;
};

const TripInfoLocationCard = ({
    description,
    scheduledDateTimeString,
    estimatedDateTimeString,
    actualDateTimeString,
    name,
    region,
}: LocationCardProps) => {
    const scheduledTime = moment(scheduledDateTimeString);
    const estimatedTime = estimatedDateTimeString ? moment(estimatedDateTimeString) : undefined;
    const actualTime = actualDateTimeString ? moment(actualDateTimeString) : undefined;
    const delayed = isDelayed(scheduledTime, actualTime) || isDelayed(scheduledTime, estimatedTime);

    return (
        <div className="bordered-card">
            <p>
                <strong>{description} Time: </strong>
                <span
                    className={
                        delayed ? 'location-card-delayed-scheduled-time' : 'location-card-on-time'
                    }
                >
                    {scheduledTime.format('HH:mm')}
                </span>
                {delayed && (
                    <span className="location-card-delayed-time">
                        {(actualTime || estimatedTime).format('HH:mm')}
                    </span>
                )}
            </p>
            <p>
                <strong>Stop: </strong>
                <span>{name}</span>
            </p>
            <p>
                <strong>Location: </strong>
                <span>{region}</span>
            </p>
        </div>
    );
};

export default TripInfoLocationCard;
