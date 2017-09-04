import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import  * as XLSX  from 'xlsx';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoaderProvider } from '../providers/loader/loader';
import { XlsToJsonProvider } from '../providers/xls-to-json/xls-to-json';
import { DevProvider } from '../providers/dev/dev';

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LoaderProvider,
    XlsToJsonProvider,
    DevProvider
  ]
})
export class AppModule {}
