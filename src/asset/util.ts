
import { Constants } from "../lib/constants";
import {IcaoIataMapper} from "./iataicaomapper/icao_to_iata";
import {AlternativeTag } from './fixsmalternativetagmapper/alternate';
import { Collections } from './models/schema/4.2/Collections';
import { ACRISFlight } from './models/schema/4.2/ACRISFlight';
import { AircraftMovement } from './models/schema/4.2/AircraftMovement';
import { AircraftMovementConstraint } from './models/schema/4.2/AircraftMovementConstraint';
import {AircraftMovementEmergency} from './models/schema/4.2/AircraftMovementEmergency';
import {AircraftMovementIdentification} from './models/schema/4.2/AircraftMovementIdentification';
import {AircraftMovementRoute} from './models/schema/4.2/AircraftMovementRoute';
import {AircraftTransport} from './models/schema/4.2/AircraftTransport';
import {AircraftTransportFormation} from './models/schema/4.2/AircraftTransportFormation';
import {AircraftTransportType} from './models/schema/4.2/AircraftTransportType';
import {AirportFacility} from './models/schema/4.2/AirportFacility';
import {CargoItem} from './models/schema/4.2/CargoItem';
import {DinDinghy} from './models/schema/4.2/DinDinghy';
import {MeteorologicalEnvironment} from './models/schema/4.2/MeteorologicalEnvironment';
import {PackageGroupType} from './models/schema/4.2/PackageGroupType';
import {RouteConstraint} from './models/schema/4.2/RouteConstraint';

export class Utils{

public  static getModel(modelFileName :string,version?:string){

    if(version === undefined){
        version = Constants.DEFAULT_VERSION;
    }
  
    if(modelFileName.indexOf(".") >0) {

        modelFileName = modelFileName.substring(0, (modelFileName.indexOf(".") -1));
    }
   
    if(modelFileName === 'ACRISFlight') return JSON.stringify(ACRISFlight.acrisFlight);
    if(modelFileName === 'AircraftMovement') return JSON.stringify(AircraftMovement.aircraftMovement);
    if(modelFileName === 'AircraftMovementConstraint') return JSON.stringify(AircraftMovementConstraint.aircraftMovementConstraint);
    if(modelFileName === 'AircraftMovementEmergency') return JSON.stringify(AircraftMovementEmergency.aircraftMovementEmergency);
    if(modelFileName === 'AircraftMovementIdentification') return JSON.stringify(AircraftMovementIdentification.aircraftMovementIdentification);
    if(modelFileName === 'AircraftMovementRoute') return JSON.stringify(AircraftMovementRoute.aircraftMovementRoute);

    if(modelFileName === 'AircraftTransport') return JSON.stringify(AircraftTransport.aircraftTransport);
    if(modelFileName === 'AircraftTransportFormation') return JSON.stringify(AircraftTransportFormation.aircraftTransportFormation);
    if(modelFileName === 'AircraftTransportType') return JSON.stringify(AircraftTransportType.aircraftTransportType);
    if(modelFileName === 'AirportFacility') return JSON.stringify(AirportFacility.airportFacility);
    if(modelFileName === 'CargoItem') return JSON.stringify(CargoItem.cargoItem);
    if(modelFileName === 'DinDinghy') return JSON.stringify(DinDinghy.dinDinghy);
    if(modelFileName === 'MeteorologicalEnvironment') return JSON.stringify(MeteorologicalEnvironment.meteorologicalEnvironment);
    if(modelFileName === 'PackageGroupType') return JSON.stringify(PackageGroupType.packageGroupType);
    if(modelFileName === 'RouteConstraint') return JSON.stringify(RouteConstraint.routeConstraint);
    

}
public static getIATA(){
    return JSON.parse(JSON.stringify(IcaoIataMapper.icaoIataMapper));
  
}

public static getAlternative(){
    return JSON.parse(JSON.stringify(AlternativeTag.alternativeTags));
}

public static getCollectionModel(version?:string){
    return JSON.parse(JSON.stringify(Collections.collectionsData));

}

}

