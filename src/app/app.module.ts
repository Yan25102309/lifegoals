import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Requerido para [(ngModel)]

// Configuración moderna de Firebase para Angular 18
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

import { AppRoutingModule } from './app-routing.module'; // Requerido para <router-outlet>
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule, // Módulo de rutas limpio aquí
    FormsModule       // Módulo de formularios limpio aquí
  ],
  providers: [
    // 🌟 ¡AQUÍ ES DONDE DEBEN IR LOS PROVIDERS DE FIREBASE EN ANGULAR 18!
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
