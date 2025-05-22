import { tripDuration } from './utils';
import { TripInfo } from '../../types/Trips';

describe('utils', () => {
    describe('tripDuration', () => {
        it('should pick the actual times to calculate the duration, if available', () => {
            const tripInfo = {
                origin: {
                    actualDepartureTime: '2023-10-01T10:05:00Z',
                    estimatedDepartureTime: '2023-10-01T10:00:00Z',
                    scheduledDepartureTime: '2023-10-01T10:00:00Z',
                    name: 'Origin',
                    region: 'Region A',
                },
                destination: {
                    actualArrivalTime: '2023-10-01T12:15:00Z',
                    estimatedArrivalTime: '2023-10-01T12:00:00Z',
                    scheduledArrivalTime: '2023-10-01T12:00:00Z',
                    name: 'Destination',
                    region: 'Region B',
                },
            } as TripInfo;
            const duration = tripDuration(tripInfo);
            expect(duration).toBe('2h 10m');
        });
        it('should pick the estimated times to calculate the duration, if available', () => {
            const tripInfo = {
                origin: {
                    actualDepartureTime: undefined,
                    estimatedDepartureTime: '2023-10-01T10:05:00Z',
                    scheduledDepartureTime: '2023-10-01T10:00:00Z',
                    name: 'Origin',
                    region: 'Region A',
                },
                destination: {
                    actualArrivalTime: undefined,
                    estimatedArrivalTime: '2023-10-01T12:15:00Z',
                    scheduledArrivalTime: '2023-10-01T12:00:00Z',
                    name: 'Destination',
                    region: 'Region B',
                },
            } as TripInfo;
            const duration = tripDuration(tripInfo);
            expect(duration).toBe('2h 10m');
        });
        it('should pick the scheduled times to calculate the duration, if neither the actual or estimated are available', () => {
            const tripInfo = {
                origin: {
                    actualDepartureTime: undefined,
                    estimatedDepartureTime: undefined,
                    scheduledDepartureTime: '2023-10-01T10:00:00Z',
                    name: 'Origin',
                    region: 'Region A',
                },
                destination: {
                    actualArrivalTime: undefined,
                    estimatedArrivalTime: undefined,
                    scheduledArrivalTime: '2023-10-01T12:00:00Z',
                    name: 'Destination',
                    region: 'Region B',
                },
            } as TripInfo;
            const duration = tripDuration(tripInfo);
            expect(duration).toBe('2h 0m');
        });
    });
});
