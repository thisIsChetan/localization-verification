import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import  * as XLSX  from 'xlsx';

/*
  Generated class for the XlsToJsonProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class XlsToJsonProvider {

  constructor() {
    console.log('Hello XlsToJsonProvider Provider');
  }

  /* fixdata and rABS are defined in the drag and drop example */
handleFile(e) {
  return new Promise((resolve, reject) => {
    var files = e.target.files;
    var i,f;
    console.log(e)
    for (i = 0; i != files.length; ++i) {
      f = files[i];
      var reader = new FileReader();
      var name = f.name;
      reader.onload = (e:any)=> {
        var data = e.target.result;
        var workbook;
        workbook = XLSX.read(data, {type: 'binary'});
        let returnData = this.XLStoJSON(workbook).map((e)=>{
          let d:any = {}
          // d.value = e["Korean"];
          // d.value = e["Japanese"];
          // d.value = e["Simplified Chinese"];
          d.value = e["Traditional Chinese"];
                  
          d.key = e.Key;
          return d;
        })
        resolve(returnData);
        /* DO SOMETHING WITH workbook HERE */
      };
      reader.readAsBinaryString(f);
    }
  })
}
fixdata(data) {
  var o = "", l = 0, w = 10240;
  for(; l<data.byteLength/w; ++l) o+=String.fromCharCode.apply(null,new Uint8Array(data.slice(l*w,l*w+w)));
  o+=String.fromCharCode.apply(null, new Uint8Array(data.slice(l*w)));
  return o;
}
XLStoJSON(workbook):any{    
        var worksheetname = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[worksheetname];
        var json = XLSX.utils.sheet_to_json(worksheet, {raw: true}); 
        console.log(json);
        return json;
}

}
