import './TripVehicleCard.css'
import { TripVehicle, VehicleFeature } from "../../types/Trips";

type TripVehicleCardProps = {
    tripVehicle: TripVehicle;
};

const TripVehicleCard = ({ tripVehicle }: TripVehicleCardProps) => {
    return (
        <div className="vehicle-info-card">
            <div className="vehicle-info-card-row">
                <h1>{tripVehicle.description}</h1>
                <h3>{tripVehicle.numberPlate}</h3>
                <h3>Features</h3>
                <ul>
                    {tripVehicle.features.map((feature: VehicleFeature, index) => (
                        <li key={index}>{feature.description}</li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default TripVehicleCard
