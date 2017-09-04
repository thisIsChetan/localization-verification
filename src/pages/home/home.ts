import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { XlsToJsonProvider } from '../../providers/xls-to-json/xls-to-json';
import { LoaderProvider } from '../../providers/loader/loader'
import {Subscription} from 'rxjs/Subscription';
import { DevProvider } from '../../providers/dev/dev';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
kk: boolean = false;
json: any = [];
referenceData: any = [];
newData: any = [];
comparedData: any = [];
subscription:Subscription;
visibleCard: string = "missingData";
count = {
  missing:0,
  ok:0,
  error:0
}
  constructor(public navCtrl: NavController, 
              public loaderProvider: LoaderProvider, 
              public xlsToJsonProvider: XlsToJsonProvider,
              public devProvider: DevProvider) {
    
    // this.xlsToJsonProvider.XLStoJSON().then((json)=>{
     
    // })  

  }
  ionViewDidLoad() {
    this.subscription = this.loaderProvider.getInput$.subscribe((data) => { 
      console.log(data);
      this.referenceData = this.showParameters(data);
    })
  }

  

  showParameters(data:any){
    if(data == undefined ) return; 
     data = data.map((d)=>{
          d.Checks = [];
          d.Checks[0] = { key:"{", value: d.value.split("{").length - 1};
          d.Checks[1] = { key:"}", value: d.value.split("}").length - 1};
          d.Checks[2] = { key:"|", value: d.value.split("|").length - 1};
          d.Checks[3] = { key:"<br>", value: d.value.split("<br>").length - 1};
          d.Checks[4] = { key:"<b>", value: d.value.split("<b>").length - 1};
          d.Checks[5] = { key:"</b>", value: d.value.split("</b>").length - 1};
          d.Checks[6] = { key:"<i>", value: d.value.split("<i>").length - 1};
          d.Checks[7] = { key:"</i>", value: d.value.split("</i>").length - 1};
          d.Checks[8] = { key:"<u>", value: d.value.split("<u>").length - 1};
          d.Checks[9] = { key:"</u>", value: d.value.split("</u>").length - 1};
          return d;
        });
        return data
  }

  comapreData(){
    let missingKeys = []
    this.comparedData.data = this.referenceData.map((ref)=>{
      let data:any = {};
      data.key = ref.key;
      data.refValue = ref.value;
      data.refCheckValues = ref.Checks.map((e)=>{
        let d:any = {}
        d.key = e.key;
        d.refValue = e.value;
        return d;
      });
      let newDataElement = this.newData.filter((e)=>{
        return e.key == ref.key
      })
      // console.log(ref.key)
      // console.log(newDataElement)
      if(newDataElement.length != 1){
        console.error(newDataElement.length + " is not equal to 1 ");
        missingKeys.push(ref.key);
        data.newValue = null;
      }else{
        data.newValue = newDataElement[0].value;
        data.refCheckValues = data.refCheckValues.map((e)=>{
          e.newValue = newDataElement[0].Checks.filter((p)=>{ return p.key == e.key;})[0].value;
          return e;
        })
      }
      return data;
    })
    this.comparedData.missingKeys = missingKeys;
    console.log(this.comparedData);
    this.comparedData.missingData = this.comparedData.data.filter((e)=>{
      return !(missingKeys.indexOf(e.key) == -1)
    })
    this.comparedData.availableData = this.comparedData.data.filter((e)=>{
      return (missingKeys.indexOf(e.key) == -1)
    })
    this.comparedData.availableDataError = this.comparedData.availableData.filter((e)=>{
      let returnValue = false;
      for(let data of e.refCheckValues){
        if(data.refValue != data.newValue){
          returnValue = true;
          break;
        }
      }
      return returnValue;
    })
    this.comparedData.extraData  = [];
    this.count.missing = this.comparedData.missingData.length;
    this.count.ok = this.comparedData.availableData.length;
    this.count.error = this.comparedData.availableDataError.length;
    console.log(this.comparedData);
    
  }

createTable(data){
   data = data.map((d)=>{
    d.Checks = [];
    d.Checks[0] = { key:"{" ,value: d["value"].split("{").length - 1};
    d.Checks[1] = { key:"}",value: d["value"].split("}").length - 1};
    d.Checks[2] = { key:"|"   ,value: d["value"].split("|").length - 1};
    d.Checks[3] = { key:"<br>"          ,value: d["value"].split("<br>").length - 1};
    d.Checks[4] = { key:"<b>"       ,value: d["value"].split("<b>").length - 1};
    d.Checks[5] = { key:"</b>"      ,value: d["value"].split("</b>").length - 1};
    d.Checks[6] = { key:"<i>"     ,value: d["value"].split("<i>").length - 1};
    d.Checks[7] = { key:"</i>"    ,value: d["value"].split("</i>").length - 1};
    d.Checks[8] = { key:"<u>"  ,value: d["value"].split("<u>").length - 1};
    d.Checks[9] = { key:"</u>" ,value: d["value"].split("</u>").length - 1};
    return d;
  })
  return data;
}
loadFile(event){
  this.loaderProvider.fileUploaded(event)
}
loadXlsFile(event){
  this.xlsToJsonProvider.handleFile(event).then((newData:any)=>{
    newData.push.apply(newData,this.devProvider.getDevData())
    console.log(newData);
    this.newData = this.showParameters(newData);
  })
}
exportFile(){
  console.log(this.newData);
  let exportData = this.loaderProvider.getStructuredData(this.newData);
  let dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData));
  let dlAnchorElem = document.getElementById('downloadAnchorElem');
  dlAnchorElem.setAttribute("href",     dataStr     );
  dlAnchorElem.setAttribute("download", "new.json");
  dlAnchorElem.click();
}


}
