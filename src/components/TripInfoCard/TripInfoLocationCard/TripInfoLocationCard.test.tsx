import TripInfoLocationCard from './TripInfoLocationCard';
import { render, screen } from '@testing-library/react';

describe('TripInfoLocationCard', () => {
    it('shows the correct information when on time', () => {
        render(
            <TripInfoLocationCard
                description="Departure"
                scheduledDateTimeString="2023-01-01T10:00:00Z"
                estimatedDateTimeString="2023-01-01T10:00:00Z"
                actualDateTimeString="2023-01-01T10:00:00Z"
                name="Central Station"
                region="Downtown"
            />
        );

        const scheduledTimeSpan = screen.getByText('10:00');
        expect(scheduledTimeSpan).toBeInTheDocument();
        expect(scheduledTimeSpan).toHaveClass('location-card-on-time');
    });
    it('shows correct information if there is a delay, with scheduled and estimated times provided', () => {
        render(
            <TripInfoLocationCard
                description="Departure"
                scheduledDateTimeString="2023-01-01T10:00:00Z"
                estimatedDateTimeString="2023-01-01T10:15:00Z"
                name="Central Station"
                region="Downtown"
            />
        );

        const scheduledTimeSpan = screen.getByText('10:00');
        expect(scheduledTimeSpan).toBeInTheDocument();
        expect(scheduledTimeSpan).toHaveClass('location-card-delayed-scheduled-time');
        const estimatedTimeSpan = screen.getByText('10:15');
        expect(estimatedTimeSpan).toBeInTheDocument();
        expect(estimatedTimeSpan).toHaveClass('location-card-delayed-time');
    });
});
