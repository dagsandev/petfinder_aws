import { Injectable } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private oidcSecurityService: OidcSecurityService) {}

  // Registro: Cognito maneja el registro mediante su Hosted UI
  register(): void {
    this.oidcSecurityService.authorize();
  }

  // Login: Redirige al Hosted UI de Cognito
  login(): void {
    this.oidcSecurityService.authorize();
  }

  // Logout: Cierra sesión en Cognito
  logout(): void {
    this.oidcSecurityService.logoff().subscribe();
  }

  // Verifica el estado de autenticación
//   isLoggedIn(): Observable<boolean> {
//     return this.oidcSecurityService.isAuthenticated$;
//   }

  // Obtiene datos del usuario desde el token
  getUserData(): Observable<any> {
    return this.oidcSecurityService.userData$;
  }

  // Recuperación de contraseña (Requiere configuración en Cognito)
//   async enviarCorreoRecuperacion(email: string): Promise<string> {
//     // Implementación mediante API de Cognito o redirección al Hosted UI
//     return 'Verifique su email para instrucciones de recuperación';
//   }

  // Verificación de email (Requiere integración con AWS SDK)
//   async verificarEmailRegistrado(email: string): Promise<boolean> {
//     // Implementación usando AWS Cognito Identity Provider
//     return false; // Placeholder
//   }

  // Obtiene el token de acceso
  getAccessToken(): Observable<string> {
    return this.oidcSecurityService.getAccessToken();
  }
}