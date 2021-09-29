/* eslint @typescript-eslint/no-var-requires: "off" */
import {ObjectHandler} from'./objecthandler' ;
import {Filter} from "./filters"

/* tslint:disable no-var-requires */
const IterateObject = require("iterate-object");

export class Formatter{

public static setTextValue(dataValue:any): any{
    if(ObjectHandler.keyPresent(dataValue,"_")){
        dataValue.value = dataValue._
        delete dataValue._
    }

}

public static formatObject(formatObj:any): any{
    IterateObject(formatObj,(value: any,name:any)=> {
        const type = ObjectHandler.getType(value)
        switch (type){
            case 'object':
                Formatter.setTextValue(value)
                Filter.removeUnwantedKeys(value);
                Filter.removeTag(value);
                Filter.removeSingleArray(value);
                Filter.removeEmptyFields(value);
                Filter.removeEmptyArrays(name,value,formatObj);
                Filter.removeEmptyObject(name,value,formatObj);
                break;
            case 'array':
                Formatter.formatObject(value);
                break;
        }
    })
    Filter.removeEmptyKeyFields(formatObj);
    return formatObj;
}

}
