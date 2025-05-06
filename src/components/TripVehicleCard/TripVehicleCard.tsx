import './TripVehicleCard.css';
import { TripVehicle, VehicleFeature } from '../../types/Trips';

type TripVehicleCardProps = {
    tripVehicle: TripVehicle;
};

const TripVehicleCard = ({ tripVehicle }: TripVehicleCardProps) => {
    return (
        <div className="card">
            <div className="card-row">
                <h1>Coach Details</h1>
            </div>
            <div className="card-row">
                <div className="bordered-card">
                    <h2>
                        {tripVehicle.description} - {tripVehicle.numberPlate}
                    </h2>
                    <ul>
                        {tripVehicle.features.map((feature: VehicleFeature, index) => (
                            <li key={index}>{feature.description}</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default TripVehicleCard;
