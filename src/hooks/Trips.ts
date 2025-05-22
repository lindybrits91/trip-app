import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import _ from 'lodash';
import { GPSLocation, Trip, TripInfo, TripStop, TripVehicle, VehicleFeature } from '../types/Trips';

const EMBER_TRIPS_API_URL = 'https://api.ember.to/v1/trips';

export const useTrip = (trip_uid: string) => {
    return useQuery<Trip, Error>({
        queryKey: ['trip', trip_uid],
        queryFn: () => fetchTrip(trip_uid),
        refetchInterval: query => {
            if (query.state.status === 'error') return false;
            return 2000;
        },
        retry: false,
        refetchIntervalInBackground: true,
    });
};

export const fetchTrip = async (trip_uid: string): Promise<Trip> => {
    const res = await axios.get(`${EMBER_TRIPS_API_URL}/${trip_uid}`);
    return parseResponse(res.data);
};

const parseResponse = (responseData: any) => {
    const { route, vehicle } = responseData;
    const routeOrigin = route[0];
    const routeDestination = route[route.length - 1];
    const tripInfo = {
        origin: {
            name: routeOrigin.location.detailed_name,
            region: routeOrigin.location.region_name,
            scheduledDepartureTime: routeOrigin.departure.scheduled,
            estimatedDepartureTime: routeOrigin.departure.estimated,
            actualDepartureTime: routeOrigin.departure.actual,
        } as TripStop,
        destination: {
            name: routeDestination.location.name,
            region: routeDestination.location.region_name,
            scheduledArrivalTime: routeDestination.arrival.scheduled,
            estimatedArrivalTime: routeDestination.arrival.estimated,
            actualArrivalTime: routeDestination.arrival.actual,
        },
        stops: route.map(stop => ({
            name: stop.location.detailed_name,
            region: stop.location.region_name,
            latitude: stop.location.lat,
            longitude: stop.location.lon,
            scheduledArrivalTime: stop.arrival.scheduled,
            estimatedArrivalTime: stop.arrival.estimated,
        })) as TripStop[],
    } as TripInfo;
    const tripVehicle = {
        description: _.startCase(`${vehicle.brand} ${vehicle.type}`),
        numberPlate: vehicle.plate_number,
        features: getFeatures(vehicle),
        location: {
            latitude: vehicle.gps.latitude,
            longitude: vehicle.gps.longitude,
        } as GPSLocation,
    } as TripVehicle;
    return {
        tripInfo,
        tripVehicle,
    };
};

const getFeatures = (vehicle: any): VehicleFeature[] => {
    const features: VehicleFeature[] = [];
    if (vehicle.has_toilet) {
        features.push({
            description: 'Toilet',
        });
    }
    if (vehicle.has_wifi) {
        features.push({
            description: 'Wi-Fi',
        });
    }
    if (vehicle.bicycle > 0) {
        features.push({
            description: `${vehicle.bicycle} x Bicycle`,
        });
    }
    if (vehicle.wheelchair > 0) {
        features.push({
            description: `${vehicle.wheelchair} x Wheelchair`,
        });
    }
    return features;
};
