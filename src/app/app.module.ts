import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NbThemeModule,
  NbLayoutModule,
  NbCardModule,
  NbInputModule,
  NbButtonModule,
  NbIconModule,
  NbSpinnerModule,
  NbToastrModule,
  NbAlertModule
} from '@nebular/theme';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import { environment } from '../environments/environment';
import { HomeComponent } from './pages/home/home.component';
import { FormsModule } from '@angular/forms';
import { VotingPlanningComponent } from './pages/voting-planning/voting-planning.component';

@NgModule({
  declarations: [AppComponent, HomeComponent, VotingPlanningComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'dark' }),
    NbEvaIconsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    NbLayoutModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbSpinnerModule,
    NbToastrModule.forRoot({
      destroyByClick: true,
      preventDuplicates: true
    }),
    NbAlertModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
