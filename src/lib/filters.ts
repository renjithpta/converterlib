import { Constants } from "./constants";
import { ObjectHandler} from "./objecthandler";
export class Filter {

public static removeUnwantedKeys(dataValue : any): void{
    Constants.KEYS_REMOVABLE.forEach( (key: any) =>{
        if(ObjectHandler.keyPresent(dataValue,key)){
            delete dataValue[key] ;
         }
    })

}

public static removeTag(objValue:any):void{

    Object.keys(objValue).forEach(key=>{
        Constants.TAGS_REMOVABLE.forEach( (tagValue: any) =>{
            if(key.includes(tagValue)){
                const newKey = key.replace(tagValue,'');
                objValue[newKey] = objValue[key];
                delete objValue[key];
            }
        })

    })
}

public static removeEmptyFields(obj:any): void{

    Object.keys(obj).forEach(key=>{
        
        if (!/\S/.test(obj[key])) {
            delete obj[key];
        }
    });
}


public static removeSingleArray(obj:any): void{

    Object.keys(obj).forEach(key=>{
        if(Array.isArray(obj[key])){
            if(obj[key].length === 1){
                obj[key] = obj[key][0];
            }
        }
    });
}

public static removeEmptyObject(key:any,value:any,obj:any): void{
    if(ObjectHandler.isEmpty(value)){
        delete obj[key];
    }
}

public static removeEmptyArrays(key:any,value:any,obj:any): void{
    if(Array.isArray(value)){
        if(value.length === 0){
                delete obj[key];
        }

    }

}

public static removeEmptyKeyFields(obj:any): void{
    
    Object.keys(obj).forEach(key=>{
            if(ObjectHandler.isEmpty(obj[key])){
                delete obj[key];
            }
        });

}


}
