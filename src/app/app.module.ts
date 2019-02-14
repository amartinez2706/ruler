import { BrowserModule, /*HammerGestureConfig,HAMMER_GESTURE_CONFIG*/ } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';


import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

//import * as Hammer from 'hammerjs';

/*export class MyHammerConfig extends HammerGestureConfig{
    overrides = <any>{
      'pan': {
        direction: Hammer.DIRECTION_ALL,
        threshold:0
      },
      'pinch':{
        enable: true
      }
    }
}*/

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    
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
    //{provide: HAMMER_GESTURE_CONFIG, useClass:MyHammerConfig}
  ]
})
export class AppModule {}
