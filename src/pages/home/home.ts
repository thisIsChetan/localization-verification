import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import  * as XLSX  from 'xlsx';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
kk:boolean=false;
json:any=[];
  constructor(public navCtrl: NavController) {

  }


public XLStoJSON(){
  return new Promise((resolve, reject) => {
    var url = '../../assets/GlobalSecurityLocalizationFile.xlsx';
    var oReq = new XMLHttpRequest();
    var workbook: any;
    oReq.open("GET", url, true);
    oReq.responseType = "arraybuffer";
    oReq.onload = (e) => {
      if (oReq.status >= 200 && oReq.status < 300) {
        var arraybuffer = oReq.response;
        var data = new Uint8Array(arraybuffer);
        var arr = new Array();
        for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
         console.log("arr",arr);
        var bstr = arr.join("");
    
        workbook = XLSX.read(bstr, {type:"binary"});
        var worksheetname = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[worksheetname];
        var json = XLSX.utils.sheet_to_json(worksheet, {raw: true});
        resolve('Finished generating JSON');
      
        this.createTable(json);
      } else {
        reject(console.log('XMLHttpRequest failed; error code:' + oReq.statusText));
      }
    }
    oReq.send();
  });
}

createTable(json){
  console.log("json",json);
  this.json=json;
}

}
