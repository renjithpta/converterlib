import { Utils } from "../asset/util";
// tslint:disable-next-line: no-var-requires
const IterateObject = require("iterate-object")

export class ObjectHandler {


public static getType(object:any): any{
    if(Array.isArray(object)){
        return 'array' ;
    }else{
        return typeof object ;
    }
}


public static JSONify(data :any): any{
    return JSON.parse(JSON.stringify(data));
}


public static getDataFromObject(dataObject : any,Key :any):any{
    Key = this.verifiedKey(dataObject,Key);
    if(Key === null){
        return ''
    }
    let keyValue = dataObject[Key];
    switch(typeof keyValue){
            case 'object':
                if(Array.isArray(keyValue)){
                    keyValue = keyValue[0];
                }else{
                    keyValue = this.JSONify(keyValue);
                }
                break
            case 'undefined':
              
                keyValue = '';
            }
    return keyValue;
}


public static fetchDataFromPath(dataObj: any, keyList:string[]): any{
    keyList.forEach(key =>{
        dataObj = ObjectHandler.getDataFromObject(dataObj,key);
    })
    if(Array.isArray(dataObj)){
        dataObj = dataObj[0];
    }
    return dataObj;

}


public static verifiedKey(dataObj :object,key:any): any{
    if (!Array.isArray(dataObj)){
        if(dataObj.hasOwnProperty(key)){
            return key ;
        }else{
            return this.tryAlternateKey(key) ;
       }
    }
    
}

public static tryAlternateKey(key:string): any{
    const altKeys = Utils.getAlternative();
    if(altKeys.hasOwnProperty(key)){
        return altKeys[key] ;

    }else{

        return null ;
    }

}

public static generateCollectionFromObject(collectionObject:any,Key:string,collectionDetails:any,iterObj:any):any{
  let CollectObj :any;
  const collectionKeySet = collectionDetails.keys
  let collectionBase = collectionDetails.base
  if(iterObj !== ''){
        IterateObject([iterObj],(value:any)=>{
            switch (ObjectHandler.getType(value)){
                case 'object':
                        collectionBase = this.verifiedKey(value,collectionBase)
                        if(collectionBase !== null){
                            CollectObj = value[collectionBase]
                            collectionKeySet.forEach((key:any)=>{
                                CollectObj = this.collectKeys(CollectObj,key)
                            })
                            collectionObject[Key] = [CollectObj]
                            break
                        }else{
                            collectionObject[Key] = []
                            break
                        }
                case 'array':
                    this.generateCollectionFromObject(collectionObject,Key,collectionDetails,value)
            }
        })
    }else{
        collectionObject[Key] = []
    }
   
}



public static collectKeys(obj :any,Pkey:any): any{
    const objectLst:any = []
    IterateObject(obj,(value:any)=>{
        switch(this.getType(value)){
            case 'object':
                Object.keys(value).forEach(key=>{
                    if(key === Pkey){
                        objectLst.push(value[key][0])
                    }
                })
        }
    })
    obj = objectLst
    return obj
}


public static isEmpty(obj:any): boolean{
    // tslint:disable-next-line: prefer-const
    for(let key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

public static keyPresent(srcObj:any,keyValue :string): any{
    return srcObj.hasOwnProperty(keyValue) ;
}

}