
export class Constants{

public  static ICAO_KEYS : any=["locationIndicator"];
public static  TAGS_REMOVABLE: any =["fx:","fb:"];
public static  KEYS_REMOVABLE: any = ["extension","$","xsi:type"];
public  static DEFAULT_VERSION: string = "4.2";
public  static initializeAcris() : any {

    return {
        "operatingAirline": {
          "iataCode": "",
          "icaoCode": "",
          "name": ""
        },
          "aircraftType": {
          "icaoCode": "",
          "modelName": "",
          "registration": ""
        },
        "flightNumber": {
          "airlineCode": "",
          "trackNumber": ""
        },
        "departureAirport": "",
        "arrivalAirport": "",
        "originDate": "",
        "departure": {
          "scheduled": "",
          "estimated": "",
          "actual": "",
          "terminal": "",
          "gate": ""
        },
        "arrival": {
          "scheduled": "",
          "estimated": "",
          "actual": "",
          "terminal": "",
          "gate": ""
        },
        "flightStatus": "",
        "extensions": {}
      }
};

}