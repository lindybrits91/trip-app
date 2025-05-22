
export type Trip = {
    tripInfo: TripInfo
    tripVehicle: TripVehicle
}

export type TripInfo = {
    origin: TripStop
    destination: TripStop
    durationInMinutes?: number
    stops: TripStop[]
}

export type Vehicle = {
    description: string
    numberPlate: string
    features: VehicleFeature[]
}

export type TripVehicle = Vehicle & {
    location: GPSLocation
    nextStop?: TripStop
}

export type Stop = {
    name: string
    region: string
    latitude: number
    longitude: number
}

export type TripStop = Stop & {
    scheduledArrivalTime: string
    scheduledDepartureTime: string
    estimatedArrivalTime?: string
    estimatedDepartureTime?: string
    actualArrivalTime?: string
    actualDepartureTime?: string
}

export type GPSLocation = {
    latitude: number
    longitude: number
}

export type VehicleFeature = {
    description: string
}
