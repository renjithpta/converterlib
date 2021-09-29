import { toClass } from "class-converter";
import {ACRISFlight} from "../asset/models/acrisflight";
import {ObjectHandler} from "./objecthandler"
import {Formatter} from "./formatter" ;
import {Utils} from "../asset/util" ; 
import {Parser} from "xml2js";
import {Validator} from "./validator";
import {Constants} from "./constants";

export class FixmParser{

VERSION :string = "4.2" ;
FIXM_DATA:object;
ACRIS_OBJ:object;
parser:Parser = new Parser({ignoreAttrs : false, mergeAttrs : false});

constructor(){

}

private  setObjectValues(fixmDataObj:object): any{
    this.ACRIS_OBJ =  ObjectHandler.JSONify(Constants.initializeAcris());
    this.FIXM_DATA = fixmDataObj;
}

// Takes in an XML string and converts it to ACRIS
public transformFixmToAcris(xmlString:any):any{
    try{
        this.setFixmDataFromXMLContent(xmlString);
    }catch(e){
        
        return;
    }
    this.ACRIS_OBJ = ObjectHandler.JSONify(this.mapper(ACRISFlight));
    this.ACRIS_OBJ = Validator.validateObject(this.ACRIS_OBJ);
    this.ACRIS_OBJ = Formatter.formatObject(this.ACRIS_OBJ);
    return this.ACRIS_OBJ;
}

// Maps the XML tags to ACRIS attributes
public mapper (classElement:any): any{
    const dataObj = this.mapAttributesOfElement(classElement.name);
    toClass(dataObj,classElement);
    return dataObj;
}

public mapAttributesOfElement(elementName : string,elementObj?: any):any{
    let AirMoveAttributes:any;
    if(elementObj !== undefined){
        AirMoveAttributes = elementObj;
    }else{
        AirMoveAttributes = JSON.parse(Utils.getModel(elementName,this.VERSION));
    }
    Object.keys(AirMoveAttributes).forEach( key =>{ 
        const keyValue = AirMoveAttributes[key];
        const valueType = ObjectHandler.getType(keyValue);
        switch (valueType){
            case 'array':
                AirMoveAttributes[key] = ObjectHandler.fetchDataFromPath(this.FIXM_DATA,keyValue);
                break;
            case 'string':
                if(keyValue.includes("_collection")){
                    const model = Utils.getCollectionModel(this.VERSION);
                    const collectionObjectDetails = model[keyValue];
                    const iterobj = ObjectHandler.fetchDataFromPath(this.FIXM_DATA,collectionObjectDetails.path);
                    ObjectHandler.generateCollectionFromObject(AirMoveAttributes,key,collectionObjectDetails,iterobj);
                }else{
                    AirMoveAttributes[key] = this.mapAttributesOfElement((elementName=keyValue));
                }
                break;
            case 'object':
                AirMoveAttributes[key]=this.mapAttributesOfElement(elementName,(elementObj=keyValue));
                break;
        }    
    })
    return AirMoveAttributes;
}

public  setFixmDataFromXMLContent (fixmData:string): any{

    this.parser.parseString(fixmData, (err:any, result:any) => {
        if(err) throw err;
        this.setObjectValues(result);
    });
}

}
