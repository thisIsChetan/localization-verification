import { Injectable } from '@angular/core';


import { BehaviorSubject } from 'rxjs/BehaviorSubject';



/*
  Generated class for the LoaderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoaderProvider {
  private langArray = [];

  constructor() {    
  }

  fileUploaded(event) {
      var files = event.srcElement.files;
      console.log(files);
      var reader = new FileReader();
      reader.onload = (event:any)=>{
          // console.log(event.target.result);
          var obj = JSON.parse(event.target.result);
          console.log(obj);
          let destructedArray = this.getdestructuredData(obj);
          console.log(destructedArray);
          this.changeInput(destructedArray);
      };
      reader.readAsText(event.target.files[0]);
  }

  // Observable getInput source
  private _inputSource = new BehaviorSubject<any>(undefined);
  // Observable getInput stream
  getInput$ = this._inputSource.asObservable();
  // service command
  changeInput(array) {
    console.log(array);
    this._inputSource.next(array);
  }
  
 


  getdestructuredData(obj){
          this.langArray = [];
          this.destructuring(obj,[]);
          console.log(this.langArray);
          return this.langArray;
  }
  downloadDestructured(destructedArray){
    let csvRows = []
          for(let data of destructedArray){
            console.log(data.key,data.value);
            csvRows.push(data.key+"^  "+data.value);
          }
          var csvString = csvRows.join("%0A");
          var a         = document.createElement('a');
          a.href        = 'data:text/txt,' + csvString;
          a.target      = '_blank';
          a.download    = 'myFile.txt';

          document.body.appendChild(a);
          a.click();
  }

  
  private _destructuringKey = [];
  private destructuring(obj,key){

    this._destructuringKey = key;
    for(let i in Object.getOwnPropertyNames(obj)){
        if(typeof obj[Object.getOwnPropertyNames(obj)[i]] == "string"){
          if(this._destructuringKey.length == 0){
            this.langArray.push({
              key:Object.getOwnPropertyNames(obj)[i],
              value:obj[Object.getOwnPropertyNames(obj)[i]]
            });
          }else{
            this.langArray.push({
              key:this._destructuringKey.join(".") + "."+ Object.getOwnPropertyNames(obj)[i],
              value:obj[Object.getOwnPropertyNames(obj)[i]]
            });
          }

        }
        else{
          this._destructuringKey.push(Object.getOwnPropertyNames(obj)[i]);
          this.destructuring(obj[Object.getOwnPropertyNames(obj)[i]],this._destructuringKey  );
        }
    }
    this._destructuringKey.pop();
  }

  getStructuredData(array):any{
    let newArray = {};
    array.map((d)=>{
      newArray[d.key] = d.value;
    })
    console.log(newArray);
    return this.structuring(newArray);
  }
  private _uniJson
  private structuring(uniJson):any {
    console.log(uniJson);
    this._uniJson = uniJson;
    let keysArray = [];
    for(let key in uniJson){      
      let keys = key.split(".");
      keysArray.push(keys);  
    }
    return this.getObjectFinal(keysArray,"")

  }
  

  getObjectFinal(keysArray, value){
    // Getting unique keys at first index of provided keysArray
    if(keysArray[0] == "" ){
      //Recursion termination case
      return this._uniJson[value];
    }

    //Getting uniqueKey
    let uniqueKey = [];
    for(let i in keysArray){
      if(uniqueKey.indexOf(keysArray[i][0])<0){
        uniqueKey.push(keysArray[i][0])
      }
    } 
    let returnValue = {}
    for(let i in uniqueKey){
      let newKeysArray = keysArray.filter((e)=>{ return e[0] === uniqueKey[i] }); 
      // console.log(newKeysArray);
      let keyNow = newKeysArray[0]
      for(let j in newKeysArray){
          newKeysArray[j] = newKeysArray[j].slice(1);
      }   
      // console.log(keyNow[0]);   
      returnValue[keyNow[0]] = this.getObjectFinal(newKeysArray, value + ((value=="")?"":".") + keyNow[0]);
      
    }
    return returnValue;
  }

}
