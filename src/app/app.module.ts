import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoNgZorroAntdModule } from './ng-zorro-antd.module';
import { HomeComponent } from './home/home.component';
import { SingleSheetComponent } from './home/singleSheet/singleSheet.component';
import { PlayerComponent } from './player/player.component';
import { PlayerSliderComponent } from './player/playerSlider/playerSlider.component';
import { StoreModule } from '@ngrx/store';
import { playerReducer } from './player/store/player.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { EffectsModule } from '@ngrx/effects';
registerLocaleData(en);

@NgModule({
  declarations: [		
    AppComponent,
      HomeComponent,
      SingleSheetComponent,
      PlayerComponent,
      PlayerSliderComponent
   ],
  imports: [
    StoreModule.forRoot({player:playerReducer}),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    EffectsModule.forRoot([]),
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    DemoNgZorroAntdModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
