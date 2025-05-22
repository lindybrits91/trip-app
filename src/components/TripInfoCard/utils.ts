import moment from 'moment/moment';
import { TripInfo } from '../../types/Trips';

export const tripDuration = (tripInfo: TripInfo): string => {
    // Departure Time
    const actualDepartureTime = tripInfo.origin.actualDepartureTime
        ? moment(tripInfo.origin.actualDepartureTime)
        : undefined;
    const estimatedDepartureTime = tripInfo.origin.estimatedDepartureTime
        ? moment(tripInfo.origin.estimatedDepartureTime)
        : undefined;
    const scheduledDepartureTime = moment(tripInfo.origin.scheduledDepartureTime);
    const departureTime = actualDepartureTime || estimatedDepartureTime || scheduledDepartureTime;
    // Arrival Time
    const actualArrivalTime = tripInfo.destination.actualArrivalTime
        ? moment(tripInfo.destination.actualArrivalTime)
        : undefined;
    const estimatedArrivalTime = tripInfo.destination.estimatedArrivalTime
        ? moment(tripInfo.destination.estimatedArrivalTime)
        : undefined;
    const scheduledArrivalTime = moment(tripInfo.destination.scheduledArrivalTime);
    const arrivalTime = actualArrivalTime || estimatedArrivalTime || scheduledArrivalTime;
    // Duration
    // I've seen times when this fails and is off by a minute, something to improve on
    const duration = moment.duration(arrivalTime.diff(departureTime));
    return `${duration.hours()}h ${duration.minutes()}m`;
};

export const isDelayed = (originalTime: moment.Moment, eventualTime: moment.Moment): boolean => {
    if (!eventualTime) {
        return undefined;
    }
    const isSameMinute = originalTime.isSame(eventualTime, 'minute');
    if (isSameMinute) {
        return false;
    }
    return eventualTime.isAfter(originalTime);
};
