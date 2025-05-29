import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicModule } from '@ionic/angular'; 
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
// Firebase imports
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideFirestore, getFirestore } from '@angular/fire/firestore'; // Importa Firestore
import { AppComponent } from './app.component';
//import { firebaseConfig } from 'src/environments/environment';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { CrearPublicacionModalComponent } from './crear-publicacion-modal/crear-publicacion-modal.component';
import { ToastService } from './services/toast.service';

//auth con aws cognito
import { AuthModule } from 'angular-auth-oidc-client';
import { LoginCognitoComponent } from './login-cognito/login-cognito.component';
import { AuthConfigModule } from './auth/auth-config.module';

@NgModule({
  declarations: [
    AppComponent,
    CrearPublicacionModalComponent,
    LoginCognitoComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(), // Configuración básica de Ionic
    AppRoutingModule, // Agrega AppRoutingModule para las rutas
    FormsModule, // Crear y gestionar formularios que dependen del HTML de la plantilla.
    ReactiveFormsModule,
    HttpClientModule,
    AuthConfigModule,
  ],
  providers: [
    // Inicializar Firebase con la configuración del entorno
    //provideFirebaseApp(() => initializeApp(firebaseConfig)),
    // Inicializar Firebase Auth
    provideAuth(() => getAuth()),
    // Inicializar Firestore
    provideFirestore(() => getFirestore()), // Añade esta línea para Firestore
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] 
})
export class AppModule {}
