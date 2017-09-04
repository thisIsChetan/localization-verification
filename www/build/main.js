webpackJsonp([0],{

/***/ 108:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 108;

/***/ }),

/***/ 150:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 150;

/***/ }),

/***/ 194:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_xls_to_json_xls_to_json__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_loader_loader__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__providers_dev_dev__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomePage = (function () {
    function HomePage(navCtrl, loaderProvider, xlsToJsonProvider, devProvider) {
        // this.xlsToJsonProvider.XLStoJSON().then((json)=>{
        this.navCtrl = navCtrl;
        this.loaderProvider = loaderProvider;
        this.xlsToJsonProvider = xlsToJsonProvider;
        this.devProvider = devProvider;
        this.kk = false;
        this.json = [];
        this.referenceData = [];
        this.newData = [];
        this.comparedData = [];
        this.visibleCard = "missingData";
        this.count = {
            missing: 0,
            ok: 0,
            error: 0
        };
        // })  
    }
    HomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.subscription = this.loaderProvider.getInput$.subscribe(function (data) {
            console.log(data);
            _this.referenceData = _this.showParameters(data);
        });
    };
    HomePage.prototype.showParameters = function (data) {
        if (data == undefined)
            return;
        data = data.map(function (d) {
            d.Checks = [];
            d.Checks[0] = { key: "{", value: d.value.split("{").length - 1 };
            d.Checks[1] = { key: "}", value: d.value.split("}").length - 1 };
            d.Checks[2] = { key: "|", value: d.value.split("|").length - 1 };
            d.Checks[3] = { key: "<br>", value: d.value.split("<br>").length - 1 };
            d.Checks[4] = { key: "<b>", value: d.value.split("<b>").length - 1 };
            d.Checks[5] = { key: "</b>", value: d.value.split("</b>").length - 1 };
            d.Checks[6] = { key: "<i>", value: d.value.split("<i>").length - 1 };
            d.Checks[7] = { key: "</i>", value: d.value.split("</i>").length - 1 };
            d.Checks[8] = { key: "<u>", value: d.value.split("<u>").length - 1 };
            d.Checks[9] = { key: "</u>", value: d.value.split("</u>").length - 1 };
            return d;
        });
        return data;
    };
    HomePage.prototype.comapreData = function () {
        var _this = this;
        var missingKeys = [];
        this.comparedData.data = this.referenceData.map(function (ref) {
            var data = {};
            data.key = ref.key;
            data.refValue = ref.value;
            data.refCheckValues = ref.Checks.map(function (e) {
                var d = {};
                d.key = e.key;
                d.refValue = e.value;
                return d;
            });
            var newDataElement = _this.newData.filter(function (e) {
                return e.key == ref.key;
            });
            // console.log(ref.key)
            // console.log(newDataElement)
            if (newDataElement.length != 1) {
                console.error(newDataElement.length + " is not equal to 1 ");
                missingKeys.push(ref.key);
                data.newValue = null;
            }
            else {
                data.newValue = newDataElement[0].value;
                data.refCheckValues = data.refCheckValues.map(function (e) {
                    e.newValue = newDataElement[0].Checks.filter(function (p) { return p.key == e.key; })[0].value;
                    return e;
                });
            }
            return data;
        });
        this.comparedData.missingKeys = missingKeys;
        console.log(this.comparedData);
        this.comparedData.missingData = this.comparedData.data.filter(function (e) {
            return !(missingKeys.indexOf(e.key) == -1);
        });
        this.comparedData.availableData = this.comparedData.data.filter(function (e) {
            return (missingKeys.indexOf(e.key) == -1);
        });
        this.comparedData.availableDataError = this.comparedData.availableData.filter(function (e) {
            var returnValue = false;
            for (var _i = 0, _a = e.refCheckValues; _i < _a.length; _i++) {
                var data = _a[_i];
                if (data.refValue != data.newValue) {
                    returnValue = true;
                    break;
                }
            }
            return returnValue;
        });
        this.comparedData.extraData = [];
        this.count.missing = this.comparedData.missingData.length;
        this.count.ok = this.comparedData.availableData.length;
        this.count.error = this.comparedData.availableDataError.length;
        console.log(this.comparedData);
    };
    HomePage.prototype.createTable = function (data) {
        data = data.map(function (d) {
            d.Checks = [];
            d.Checks[0] = { key: "{", value: d["value"].split("{").length - 1 };
            d.Checks[1] = { key: "}", value: d["value"].split("}").length - 1 };
            d.Checks[2] = { key: "|", value: d["value"].split("|").length - 1 };
            d.Checks[3] = { key: "<br>", value: d["value"].split("<br>").length - 1 };
            d.Checks[4] = { key: "<b>", value: d["value"].split("<b>").length - 1 };
            d.Checks[5] = { key: "</b>", value: d["value"].split("</b>").length - 1 };
            d.Checks[6] = { key: "<i>", value: d["value"].split("<i>").length - 1 };
            d.Checks[7] = { key: "</i>", value: d["value"].split("</i>").length - 1 };
            d.Checks[8] = { key: "<u>", value: d["value"].split("<u>").length - 1 };
            d.Checks[9] = { key: "</u>", value: d["value"].split("</u>").length - 1 };
            return d;
        });
        return data;
    };
    HomePage.prototype.loadFile = function (event) {
        this.loaderProvider.fileUploaded(event);
    };
    HomePage.prototype.loadXlsFile = function (event) {
        var _this = this;
        this.xlsToJsonProvider.handleFile(event).then(function (newData) {
            newData.push.apply(newData, _this.devProvider.getDevData());
            console.log(newData);
            _this.newData = _this.showParameters(newData);
        });
    };
    HomePage.prototype.exportFile = function () {
        console.log(this.newData);
        var exportData = this.loaderProvider.getStructuredData(this.newData);
        var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData));
        var dlAnchorElem = document.getElementById('downloadAnchorElem');
        dlAnchorElem.setAttribute("href", dataStr);
        dlAnchorElem.setAttribute("download", "new.json");
        dlAnchorElem.click();
    };
    return HomePage;
}());
HomePage = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
        selector: 'page-home',template:/*ion-inline-start:"/Users/pramodudakeri/Desktop/Localize/git-localization-verification/localization-verification/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title>\n      Ionic Blank\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n<a id="downloadAnchorElem" style="display:none"></a>\n<ion-content padding>\n  <ion-item>\n    <input type=\'file\'  (change)="loadFile($event)" />\n  </ion-item>\n  <ion-item>\n    <input type=\'file\'  (change)="loadXlsFile($event)" />\n  </ion-item>  \n  <ion-item>\n    <button ion-button (click)="comapreData()">Compare</button>\n  </ion-item> \n  <ion-item>\n    <button ion-button color="danger" (click)="exportFile()">Export</button>\n  </ion-item>  \n\n  <div padding>\n    <ion-segment [(ngModel)]="visibleCard">\n      <ion-segment-button value="missingData">\n        <ion-badge color="dark">{{count.missing}}</ion-badge>\n        Missing\n      </ion-segment-button>\n      <ion-segment-button value="availableData">\n        <ion-badge color="secondary">{{count.ok}}</ion-badge>\n        OK\n      </ion-segment-button>\n      <ion-segment-button value="availableDataError">\n        <ion-badge color="danger">{{count.error}}</ion-badge>\n        Error\n      </ion-segment-button>      \n      <!--<ion-segment-button value="extraData">\n        extraData\n      </ion-segment-button>-->\n    </ion-segment>\n  </div>\n    <ion-card *ngFor="let card of comparedData[visibleCard]">\n      <ion-card-header>\n        {{card.key}}\n      </ion-card-header>\n      <ion-card-content>\n        <p>English: {{card.refValue}}</p>\n        <p>New: {{card.newValue}}</p>\n        <p>\n          <ion-badge *ngFor="let check of card.refCheckValues" [color]="check.newValue!=check.refValue?\'danger\':\'light\'">\n            {{check.key}} : {{check.refValue}} {{check.newValue}} \n          </ion-badge>\n        <p>\n      </ion-card-content>\n\n    </ion-card>\n\n</ion-content>\n'/*ion-inline-end:"/Users/pramodudakeri/Desktop/Localize/git-localization-verification/localization-verification/src/pages/home/home.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["d" /* NavController */],
        __WEBPACK_IMPORTED_MODULE_3__providers_loader_loader__["a" /* LoaderProvider */],
        __WEBPACK_IMPORTED_MODULE_2__providers_xls_to_json_xls_to_json__["a" /* XlsToJsonProvider */],
        __WEBPACK_IMPORTED_MODULE_4__providers_dev_dev__["a" /* DevProvider */]])
], HomePage);

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 195:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return XlsToJsonProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_xlsx__ = __webpack_require__(267);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_xlsx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_xlsx__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/*
  Generated class for the XlsToJsonProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var XlsToJsonProvider = (function () {
    function XlsToJsonProvider() {
        console.log('Hello XlsToJsonProvider Provider');
    }
    /* fixdata and rABS are defined in the drag and drop example */
    XlsToJsonProvider.prototype.handleFile = function (e) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var files = e.target.files;
            var i, f;
            console.log(e);
            for (i = 0; i != files.length; ++i) {
                f = files[i];
                var reader = new FileReader();
                var name = f.name;
                reader.onload = function (e) {
                    var data = e.target.result;
                    var workbook;
                    workbook = __WEBPACK_IMPORTED_MODULE_2_xlsx__["read"](data, { type: 'binary' });
                    var returnData = _this.XLStoJSON(workbook).map(function (e) {
                        var d = {};
                        // d.value = e["Korean"];
                        // d.value = e["Japanese"];
                        // d.value = e["Simplified Chinese"];
                        d.value = e["Traditional Chinese"];
                        d.key = e.Key;
                        return d;
                    });
                    resolve(returnData);
                    /* DO SOMETHING WITH workbook HERE */
                };
                reader.readAsBinaryString(f);
            }
        });
    };
    XlsToJsonProvider.prototype.fixdata = function (data) {
        var o = "", l = 0, w = 10240;
        for (; l < data.byteLength / w; ++l)
            o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w, l * w + w)));
        o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
        return o;
    };
    XlsToJsonProvider.prototype.XLStoJSON = function (workbook) {
        var worksheetname = workbook.SheetNames[0];
        var worksheet = workbook.Sheets[worksheetname];
        var json = __WEBPACK_IMPORTED_MODULE_2_xlsx__["utils"].sheet_to_json(worksheet, { raw: true });
        console.log(json);
        return json;
    };
    return XlsToJsonProvider;
}());
XlsToJsonProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], XlsToJsonProvider);

//# sourceMappingURL=xls-to-json.js.map

/***/ }),

/***/ 197:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 198:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoaderProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__(276);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the LoaderProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var LoaderProvider = (function () {
    function LoaderProvider() {
        this.langArray = [];
        // Observable getInput source
        this._inputSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["BehaviorSubject"](undefined);
        // Observable getInput stream
        this.getInput$ = this._inputSource.asObservable();
        this._destructuringKey = [];
    }
    LoaderProvider.prototype.fileUploaded = function (event) {
        var _this = this;
        var files = event.srcElement.files;
        console.log(files);
        var reader = new FileReader();
        reader.onload = function (event) {
            // console.log(event.target.result);
            var obj = JSON.parse(event.target.result);
            console.log(obj);
            var destructedArray = _this.getdestructuredData(obj);
            console.log(destructedArray);
            _this.changeInput(destructedArray);
        };
        reader.readAsText(event.target.files[0]);
    };
    // service command
    LoaderProvider.prototype.changeInput = function (array) {
        console.log(array);
        this._inputSource.next(array);
    };
    LoaderProvider.prototype.getdestructuredData = function (obj) {
        this.langArray = [];
        this.destructuring(obj, []);
        console.log(this.langArray);
        return this.langArray;
    };
    LoaderProvider.prototype.downloadDestructured = function (destructedArray) {
        var csvRows = [];
        for (var _i = 0, destructedArray_1 = destructedArray; _i < destructedArray_1.length; _i++) {
            var data = destructedArray_1[_i];
            console.log(data.key, data.value);
            csvRows.push(data.key + "^  " + data.value);
        }
        var csvString = csvRows.join("%0A");
        var a = document.createElement('a');
        a.href = 'data:text/txt,' + csvString;
        a.target = '_blank';
        a.download = 'myFile.txt';
        document.body.appendChild(a);
        a.click();
    };
    LoaderProvider.prototype.destructuring = function (obj, key) {
        this._destructuringKey = key;
        for (var i in Object.getOwnPropertyNames(obj)) {
            if (typeof obj[Object.getOwnPropertyNames(obj)[i]] == "string") {
                if (this._destructuringKey.length == 0) {
                    this.langArray.push({
                        key: Object.getOwnPropertyNames(obj)[i],
                        value: obj[Object.getOwnPropertyNames(obj)[i]]
                    });
                }
                else {
                    this.langArray.push({
                        key: this._destructuringKey.join(".") + "." + Object.getOwnPropertyNames(obj)[i],
                        value: obj[Object.getOwnPropertyNames(obj)[i]]
                    });
                }
            }
            else {
                this._destructuringKey.push(Object.getOwnPropertyNames(obj)[i]);
                this.destructuring(obj[Object.getOwnPropertyNames(obj)[i]], this._destructuringKey);
            }
        }
        this._destructuringKey.pop();
    };
    LoaderProvider.prototype.getStructuredData = function (array) {
        var newArray = {};
        array.map(function (d) {
            newArray[d.key] = d.value;
        });
        console.log(newArray);
        return this.structuring(newArray);
    };
    LoaderProvider.prototype.structuring = function (uniJson) {
        console.log(uniJson);
        this._uniJson = uniJson;
        var keysArray = [];
        for (var key in uniJson) {
            var keys = key.split(".");
            keysArray.push(keys);
        }
        return this.getObjectFinal(keysArray, "");
    };
    LoaderProvider.prototype.getObjectFinal = function (keysArray, value) {
        // Getting unique keys at first index of provided keysArray
        if (keysArray[0] == "") {
            //Recursion termination case
            return this._uniJson[value];
        }
        //Getting uniqueKey
        var uniqueKey = [];
        for (var i in keysArray) {
            if (uniqueKey.indexOf(keysArray[i][0]) < 0) {
                uniqueKey.push(keysArray[i][0]);
            }
        }
        var returnValue = {};
        for (var i in uniqueKey) {
            var newKeysArray = keysArray.filter(function (e) { return e[0] === uniqueKey[i]; });
            // console.log(newKeysArray);
            var keyNow = newKeysArray[0];
            for (var j in newKeysArray) {
                newKeysArray[j] = newKeysArray[j].slice(1);
            }
            // console.log(keyNow[0]);   
            returnValue[keyNow[0]] = this.getObjectFinal(newKeysArray, value + ((value == "") ? "" : ".") + keyNow[0]);
        }
        return returnValue;
    };
    return LoaderProvider;
}());
LoaderProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], LoaderProvider);

//# sourceMappingURL=loader.js.map

/***/ }),

/***/ 199:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DevProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(196);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
  Generated class for the DevProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
var DevProvider = (function () {
    function DevProvider() {
        this._devKeys = [
            "CAROUSEL0.IMG_URL",
            "CAROUSEL1.IMG_URL",
            "CAROUSEL1.HTML_TITTLES.0.IMG_URL",
            "CAROUSEL1.HTML_TITTLES.1.IMG_URL",
            "CAROUSEL1.HTML_TITTLES.2.IMG_URL",
            "CAROUSEL1.HTML_TITTLES.3.IMG_URL",
            "CAROUSEL1.HTML_TITTLES.4.IMG_URL",
            "CAROUSEL1.HTML_TITTLES.5.IMG_URL",
            "CAROUSEL2.IMG_URL",
            "CAROUSEL3.IMG_URL",
            "CAROUSEL4.IMG_URL",
            "CAROUSEL4.HTML_TITTLES.LOGO_URL",
            "CAROUSEL4.HTML_TITTLES.SIGN_URL",
            "CARD0.IMG_URL",
            "CARD0.CARD_IMG_URL",
            "CARD0.DETAILS.INFO.0.IMG_URL",
            "CARD0.DETAILS.INFO.1.IMG_URL",
            "CARD0.DETAILS.INFO.2.IMG_URL",
            "CARD0.DETAILS.INFO.3.IMG_URL",
            "CARD0.DETAILS.INFO.4.IMG_URL",
            "CARD0.DETAILS.INFO.5.IMG_URL",
            "CARD0.DETAILS.INFO.6.IMG_URL",
            "CARD0.DETAILS.VIDEO.0.ID",
            "CARD0.DETAILS.VIDEO.0.IMG_URL",
            "CARD0.DETAILS.VIDEO.1.ID",
            "CARD0.DETAILS.VIDEO.1.IMG_URL",
            "CARD0.DETAILS.VIDEO.2.ID",
            "CARD0.DETAILS.VIDEO.2.IMG_URL",
            "CARD0.DETAILS.VIDEO.3.ID",
            "CARD0.DETAILS.VIDEO.3.IMG_URL",
            "CARD0.DETAILS.VIDEO.4.ID",
            "CARD0.DETAILS.VIDEO.4.IMG_URL",
            "CARD0.DETAILS.VIDEO.5.ID",
            "CARD0.DETAILS.VIDEO.5.IMG_URL",
            "CARD0.DETAILS.VIDEO.6.ID",
            "CARD0.DETAILS.VIDEO.6.IMG_URL",
            "CARD0.DETAILS.VIDEO.7.ID",
            "CARD0.DETAILS.VIDEO.7.IMG_URL",
            "CARD1.IMG_URL",
            "CARD1.CARD_IMG_URL",
            "CARD1.DETAILS.INFO.0.IMG_URL",
            "CARD1.DETAILS.INFO.1.IMG_URL",
            "CARD1.DETAILS.INFO.2.IMG_URL",
            "CARD1.DETAILS.INFO.3.IMG_URL",
            "CARD1.DETAILS.INFO.4.IMG_URL",
            "CARD1.DETAILS.INFO.5.IMG_URL",
            "CARD1.DETAILS.INFO.6.IMG_URL",
            "CARD1.DETAILS.INFO.7.IMG_URL",
            "CARD1.DETAILS.INFO.8.IMG_URL",
            "CARD2.IMG_URL",
            "CARD2.CARD_IMG_URL",
            "CARD2.DETAILS.INFO.0.IMG_URL",
            "CARD2.DETAILS.INFO.1.IMG_URL",
            "CARD2.DETAILS.INFO.2.IMG_URL",
            "CARD2.DETAILS.INFO.3.IMG_URL",
            "CARD2.DETAILS.INFO.4.IMG_URL",
            "CARD2.DETAILS.INFO.5.IMG_URL",
            "CARD2.DETAILS.INFO.6.IMG_URL",
            "CARD2.DETAILS.INFO.7.IMG_URL",
            "CARD3.IMG_URL",
            "CARD3.CARD_IMG_URL",
            "CARD3.DETAILS.INFO.0.IMG_URL",
            "CARD3.DETAILS.INFO.1.IMG_URL",
            "CARD3.DETAILS.INFO.2.IMG_URL",
            "CARD3.DETAILS.INFO.3.IMG_URL",
            "CARD3.DETAILS.INFO.4.IMG_URL",
            "CARD3.DETAILS.INFO.5.IMG_URL",
            "CARD3.DETAILS.INFO.6.IMG_URL",
            "CARD3.DETAILS.INFO.7.IMG_URL",
            "CARD3.DETAILS.INFO.8.IMG_URL",
            "CARD3.DETAILS.INFO.9.IMG_URL",
            "CARD3.DETAILS.INFO.10.IMG_URL",
            "CARD3.DETAILS.INFO.11.IMG_URL",
            "CARD3.DETAILS.INFO.12.IMG_URL",
            "CARD3.DETAILS.INFO.13.IMG_URL",
            "CARD4.IMG_URL",
            "CARD4.CARD_IMG_URL",
            "CARD4.DETAILS.INFO.0.IMG_URL",
            "CARD4.DETAILS.INFO.1.IMG_URL",
            "CARD4.DETAILS.INFO.2.IMG_URL",
            "CARD4.DETAILS.INFO.3.IMG_URL",
            "CARD4.DETAILS.INFO.4.IMG_URL",
            "CARD4.DETAILS.INFO.5.IMG_URL",
            "CARD4.DETAILS.INFO.6.IMG_URL",
            "CARD4.DETAILS.INFO.7.IMG_URL",
            "CARD4.DETAILS.INFO.8.IMG_URL",
            "CARD5.IMG_URL",
            "CARD5.CARD_IMG_URL",
            "CARD5.DETAILS.INFO.0.IMG_URL",
            "CARD5.DETAILS.INFO.1.IMG_URL",
            "CARD5.DETAILS.INFO.2.IMG_URL",
            "CARD5.DETAILS.INFO.3.IMG_URL",
            "CARD5.DETAILS.INFO.4.IMG_URL",
            "CARD5.DETAILS.INFO.5.IMG_URL",
            "CARD5.DETAILS.INFO.6.IMG_URL",
            "CARD5.DETAILS.INFO.7.IMG_URL",
            "CARD5.DETAILS.INFO.8.IMG_URL",
            "CARD5.DETAILS.INFO.9.IMG_URL",
            "CARD5.DETAILS.INFO.10.IMG_URL",
            "CARD5.DETAILS.INFO.11.IMG_URL",
            "CARD5.DETAILS.INFO.12.IMG_URL",
            "CARD5.DETAILS.INFO.13.IMG_URL",
            "CARD5.DETAILS.INFO.14.IMG_URL"
        ];
        this._devValues = [
            "assets/img/carousel1.png",
            "assets/img/carousel2.png",
            "assets/img/eye_icon.png",
            "assets/img/prompts_icon.png",
            "assets/img/email_icon.png",
            "assets/img/people_icon.png",
            "assets/img/funds_icon.png",
            "assets/img/page_icon.png",
            "assets/img/carousel3.png",
            "assets/img/carousel4.png",
            "assets/img/carousel5.png",
            "assets/img/pfizerLogo.png",
            "assets/img/pfizerSignature.png",
            "assets/img/explore/product_integrity_bg_img.png",
            "assets/img/ExploreModel/product_integrity_card_bg.png",
            "assets/img/ExploreModel/Product Integrity Photos-Cards/Counterfeit Tablets China (card 1).png",
            "assets/img/ExploreModel/Product Integrity Photos-Cards/Counterfeit Packaging (card 2).png",
            "assets/img/ExploreModel/Product Integrity Photos-Cards/Unsanitary Manufacture Conditions (card 3).png",
            "assets/img/ExploreModel/Product Integrity Photos-Cards/Counterfeit Printing Machine (card 4).png",
            "assets/img/ExploreModel/Product Integrity Photos-Cards/Counterfeit Injectables (card 5).png",
            "assets/img/ExploreModel/Product Integrity Photos-Cards/Unregulated Manufacturing (card 6).png",
            "assets/img/ExploreModel/Product Integrity Photos-Cards/Police Raid Counterfeit Manufacturing (card 7).png",
            "5498212614001",
            "assets/img/ExploreModel/generic_video_card.png",
            "5498209170001",
            "assets/img/ExploreModel/generic_video_card.png",
            "5498212603001",
            "assets/img/ExploreModel/generic_video_card.png",
            "5498212607001",
            "assets/img/ExploreModel/generic_video_card.png",
            "5498209178001",
            "assets/img/ExploreModel/generic_video_card.png",
            "5498219017001",
            "assets/img/ExploreModel/generic_video_card.png",
            "5498199888001",
            "assets/img/ExploreModel/generic_video_card.png",
            "5498219024001",
            "assets/img/ExploreModel/generic_video_card.png",
            "assets/img/explore/information_incident_bg_img.png",
            "assets/img/ExploreModel/information_incident_card_bg.png",
            "assets/img/ExploreModel/Information Incident Reporting Photos-Cards/Information Incident Reporting Card 1.png",
            "assets/img/ExploreModel/Information Incident Reporting Photos-Cards/You are the key card 3.png",
            "assets/img/ExploreModel/Information Incident Reporting Photos-Cards/Lost device card 4.png",
            "assets/img/ExploreModel/Information Incident Reporting Photos-Cards/Ask Questions card 5.png",
            "assets/img/ExploreModel/Information Incident Reporting Photos-Cards/Personal Information Card 6.png",
            "assets/img/ExploreModel/Information Incident Reporting Photos-Cards/Sensitive Pers Info Card7.png",
            "assets/img/ExploreModel/Information Incident Reporting Photos-Cards/PFE proprietary Info card 8.png",
            "assets/img/ExploreModel/Information Incident Reporting Photos-Cards/Intellectual Property Card 9.png",
            "assets/img/ExploreModel/Information Incident Reporting Photos-Cards/Misuse of Information Card 10.png",
            "assets/img/explore/personal_security_bg_img.png",
            "assets/img/ExploreModel/personal_security_card_bg.png",
            "assets/img/ExploreModel/Personal Security Photos-Cards/Aggressive Behavior Prohibited (card1).png",
            "assets/img/ExploreModel/Personal Security Photos-Cards/jez-timms-157470 (card2).png",
            "assets/img/ExploreModel/Personal Security Photos-Cards/clem-onojeghuo-189252(card3).png",
            "assets/img/ExploreModel/Personal Security Photos-Cards/matt-popovich-60437(card4).png",
            "assets/img/ExploreModel/Personal Security Photos-Cards/Emergency Contact List (card 5).png",
            "assets/img/ExploreModel/Personal Security Photos-Cards/Social Media - Danger Zone (card 6).png",
            "assets/img/ExploreModel/Personal Security Photos-Cards/brian-gaid-177004(card7).png",
            "assets/img/ExploreModel/Personal Security Photos-Cards/Take Action (card 8).png",
            "assets/img/explore/travel_security_bg_img.png",
            "assets/img/ExploreModel/travel_security_card_bg.png",
            "assets/img/ExploreModel/Travel Security Photos-Cards/GSOC(card 1).png",
            "assets/img/ExploreModel/Travel Security Photos-Cards/Travel Help (card 2).png",
            "assets/img/ExploreModel/Travel Security Photos-Cards/Medical Emergency (card 3).png",
            "assets/img/ExploreModel/Travel Security Photos-Cards/jose-martin-651 9card4.png",
            "assets/img/ExploreModel/Travel Security Photos-Cards/hannes-wolf(card 5).png",
            "assets/img/ExploreModel/Travel Security Photos-Cards/Emergency Contact List (card 6).png",
            "assets/img/ExploreModel/Travel Security Photos-Cards/thorn-yang-104864 (card 7).png",
            "assets/img/ExploreModel/Travel Security Photos-Cards/nabeel-syed-2856 (card 8).png",
            "assets/img/ExploreModel/Travel Security Photos-Cards/credit-card (card 9).png",
            "assets/img/ExploreModel/Travel Security Photos-Cards/Plan Your Travel (card 10).png",
            "assets/img/ExploreModel/Travel Security Photos-Cards/Pfizer Travel Desk (card 11).png",
            "assets/img/ExploreModel/Travel Security Photos-Cards/Hazardous Country Travel Program (card12).png",
            "assets/img/ExploreModel/Travel Security Photos-Cards/Safe Passage (card 13).png",
            "assets/img/ExploreModel/Travel Security Photos-Cards/GSOC(card 14).png",
            "assets/img/explore/crisis_management_bg_img.png",
            "assets/img/ExploreModel/crisis_management_card_bg.png",
            "assets/img/ExploreModel/CrisisManagementPhotos-Cards/Crisiscard1.png",
            "assets/img/ExploreModel/CrisisManagementPhotos-Cards/Crisiscard2.png",
            "assets/img/ExploreModel/CrisisManagementPhotos-Cards/Crisiscard3.png",
            "assets/img/ExploreModel/CrisisManagementPhotos-Cards/Crisiscard4.png",
            "assets/img/ExploreModel/CrisisManagementPhotos-Cards/Crisiscard5.png",
            "assets/img/ExploreModel/CrisisManagementPhotos-Cards/Crisiscard6.png",
            "assets/img/ExploreModel/CrisisManagementPhotos-Cards/Crisiscard7.png",
            "assets/img/ExploreModel/CrisisManagementPhotos-Cards/Crisiscard8.png",
            "assets/img/ExploreModel/CrisisManagementPhotos-Cards/Crisiscard9.png",
            "assets/img/explore/information_protection_bg_img.png",
            "assets/img/ExploreModel/information_protection_card_bg.png",
            "assets/img/ExploreModel/Information Protection Photos-Cards/rawpixel-com-267079(card 1).png",
            "assets/img/ExploreModel/Information Protection Photos-Cards/helloquence-61189(card 2).png",
            "assets/img/ExploreModel/Information Protection Photos-Cards/andrew-neel-218073(card 3).png",
            "assets/img/ExploreModel/Information Protection Photos-Cards/raffik-lopes-56931.(card 4)jpg.png",
            "assets/img/ExploreModel/Information Protection Photos-Cards/andrew-neel-218073(card 5).png",
            "assets/img/ExploreModel/Information Protection Photos-Cards/nick-turner-2570(card 6).png",
            "assets/img/ExploreModel/Information Protection Photos-Cards/rawpixel-com-267082(card 7).png",
            "assets/img/ExploreModel/Information Protection Photos-Cards/taduuda-72915(card 8).png",
            "assets/img/ExploreModel/Information Protection Photos-Cards/boriskin-vladislav-19014(card 9).png",
            "assets/img/ExploreModel/Information Protection Photos-Cards/stanley-dai-242205(Card 10).png",
            "assets/img/ExploreModel/Information Protection Photos-Cards/gilles-lambert-8649.(Card 11).png",
            "assets/img/ExploreModel/Information Protection Photos-Cards/daria-nepriakhina-99254(Card 12).png",
            "assets/img/ExploreModel/Information Protection Photos-Cards/glenn-carstens-peters-203007(Card 13).png",
            "assets/img/ExploreModel/Information Protection Photos-Cards/rawpixel-com-250087(Card 14).png",
            "assets/img/ExploreModel/Information Protection Photos-Cards/courtneyrecker(Card15).png"
        ];
        console.log('Hello DevProvider Provider');
    }
    DevProvider.prototype.getDevData = function () {
        var _this = this;
        var data = [];
        data = this._devKeys.map(function (d, i) {
            var r = {};
            r.key = d;
            r.value = _this._devValues[i];
            return r;
        });
        return data;
    };
    return DevProvider;
}());
DevProvider = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["B" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], DevProvider);

//# sourceMappingURL=dev.js.map

/***/ }),

/***/ 200:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(201);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(218);


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 218:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(266);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(194);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_loader_loader__ = __webpack_require__(198);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__providers_xls_to_json_xls_to_json__ = __webpack_require__(195);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_dev_dev__ = __webpack_require__(199);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["L" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["c" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */])
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["a" /* IonicApp */]],
        entryComponents: [
            __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
            __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
            { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["v" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["b" /* IonicErrorHandler */] },
            __WEBPACK_IMPORTED_MODULE_7__providers_loader_loader__["a" /* LoaderProvider */],
            __WEBPACK_IMPORTED_MODULE_8__providers_xls_to_json_xls_to_json__["a" /* XlsToJsonProvider */],
            __WEBPACK_IMPORTED_MODULE_9__providers_dev_dev__["a" /* DevProvider */]
        ]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 266:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(54);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(193);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(190);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_home_home__ = __webpack_require__(194);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_home_home__["a" /* HomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    return MyApp;
}());
MyApp = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({template:/*ion-inline-start:"/Users/pramodudakeri/Desktop/Localize/git-localization-verification/localization-verification/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/Users/pramodudakeri/Desktop/Localize/git-localization-verification/localization-verification/src/app/app.html"*/
    }),
    __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["e" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
], MyApp);

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 274:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 275:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[200]);
//# sourceMappingURL=main.js.map