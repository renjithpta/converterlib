import { Utils } from '../asset/util' ;
import {ObjectHandler } from'./objecthandler' ;
import { Constants } from './constants';
// tslint:disable-next-line: no-var-requires
const IterateObject = require("iterate-object")
export class Validator {

public static formatAirportFacility (obj:any){
    try{

    const iataCode = obj.extensions.AirportFacility.iataCode;
    if(iataCode !== ""){
        obj.extensions.AirportFacility.IATAIdentifier = iataCode;
        delete obj.extensions.AirportFacility.iataCode;
    }

    }catch(e){
        
        return;
    }
}


public static  formatFlightNumber(obj:any):any{
    
    const icaoCode = obj.flightNumber.airlineCode;
    const iataCode = Validator.toIATA(icaoCode.replace(/[0-9]/g, ''));

    if(!iataCode){
        obj.flightNumber.airlineCode = icaoCode.replace(/[0-9]/g, '');
    }else{
        obj.flightNumber.airlineCode = iataCode;
    }

    obj.flightNumber.trackNumber = icaoCode.replace(/\D/g,'');
    
    return obj;
}



public static formatIcaoCodes(dataValue:any): any{
    
    let iataData :any
    Object.keys(dataValue).forEach(key=>{
        if(key.toLowerCase().includes("icao") ){
            const icaoData = dataValue[key];
            switch (ObjectHandler.getType(icaoData)){
                case 'string':
                    iataData = Validator.toIATA(icaoData);
                    break
                case 'array':
                    const iataArray :any = [];
                    if (icaoData.length > 0){
                        icaoData.forEach((element:any) => {
                            iataArray.push(Validator.toIATA(element));
                        });
                        iataData = iataArray;
                        // if single entry array, trat it as string
                        if(iataArray.length === 1){
                            dataValue[key] = icaoData[0];
                            iataData = iataArray[0];
                        }
                    }else{
                        iataData = [];
                    }
                break
            }
            dataValue[key.replace(/icao/ig ,"iata")] = iataData;
        }else if(Constants.ICAO_KEYS.includes(key)){
            if (typeof dataValue[key] !== 'object'){
                dataValue[key] = Validator.toIATA(dataValue[key]);
            }

        }


    })
}

public static convertICAO(obj:any): any{
    IterateObject(obj,(value: any)=> {
        const type = ObjectHandler.getType(value)
        switch (type){
            case 'object':
                Validator.formatIcaoCodes(value);
                break;
               
            case 'array':
                Validator.convertICAO(value);
                break;
               
        }
    })
    return obj
}

public static validateObject(obj:any): any{
    obj = Validator.convertICAO(obj);
    Validator.formatFlightNumber(obj);
    Validator.formatAirportFacility(obj);
    return obj
}


public static toIATA(icaoCode:string): any{
    const codeList = Utils.getIATA();
    let IATAcode = codeList[icaoCode];
    if(IATAcode === undefined){
       
        IATAcode = '';
    }
    return IATAcode;

}


}