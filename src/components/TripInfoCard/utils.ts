import moment from "moment/moment";

export const isDelayed = (scheduledTime: moment.Moment, estimatedTime: moment.Moment): boolean => {
    if (!estimatedTime) {
        return false
    }
    const isSameMinute = scheduledTime.isSame(estimatedTime, 'minute');
    if (isSameMinute) {
        return false;
    }
    return estimatedTime.isAfter(scheduledTime);
}

export const tripDuration = (departureTime: moment.Moment, arrivalTime: moment.Moment): string => {
    const totalMinutes = Math.ceil(moment.duration(arrivalTime.diff(departureTime)).asMinutes());
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
};
