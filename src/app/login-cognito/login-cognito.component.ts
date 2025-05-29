// import { Component, OnInit } from '@angular/core';

// @Component({
//   selector: 'app-login-cognito',
//   templateUrl: './login-cognito.component.html',
//   styleUrls: ['./login-cognito.component.scss'],
// })
// export class LoginCognitoComponent  implements OnInit {

//   constructor() { }

//   ngOnInit() {}

// }

import { Component, OnInit, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';

@Component({
  selector: 'app-login-cognito',
  templateUrl: './login-cognito.component.html',
  styleUrls: ['./login-cognito.component.scss']
})
export class LoginCognitoComponent implements OnInit {

  email: string = '';
  password: string = '';

  private readonly oidcSecurityService = inject(OidcSecurityService);

  configuration$ = this.oidcSecurityService.getConfiguration();

  isAuthenticated = false;
  userData$ = this.oidcSecurityService.userData$

 ngOnInit(): void {
    this.oidcSecurityService.isAuthenticated$.subscribe(
      ({ isAuthenticated }) => {
        this.isAuthenticated = isAuthenticated;

        console.warn('authenticated: ', isAuthenticated);
      }
    );
 }
  //    this.oidcSecurityService.checkAuth().subscribe(({ isAuthenticated, userData, accessToken }) => {
  //   this.isAuthenticated = isAuthenticated;
  //   console.log('Autenticado:', isAuthenticated);
  //   console.log('Token:', accessToken);
  //   console.log('UserData:', userData);
  // });

  login(): void {
    console.log("click en login");
  // Validar que el usuario haya ingresado email y password para mejor UX
  // if (!this.email || !this.password) {
  //   //this.toastService.showToast('Ingrese email y contraseña');
  //   return;
  // }

  // Lanzar el flujo de login con Cognito OIDC
  this.oidcSecurityService.authorize();
}

  logout(): void {
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
    //window.location.href = "https://us-east-1vzbsecktm.auth.us-east-1.amazoncognito.com/logout?client_id=4hg4dihcralsa2udctlncg2ns1&logout_uri=http://localhost:4200/login";;
    this.oidcSecurityService.logoff();
  }
}

  // async login() {
  //   // Validar que se ingresen email y contraseña
  //   if (!this.email || !this.password) {
  //     const errorMessage = 'Ingrese email y contraseña';
  //     await this.toastService.showToast(errorMessage);
  //     return;
  //   }

  //   try {
  //     // Intentar iniciar sesión con el servicio de autenticación
  //     await this.authService.login(this.email, this.password);
  //     // Redirige a la página de tabs después del login exitoso
  //     this.router.navigate(['/tabs']);
  //   } catch (error: any) {
  //     // Si hay un código de error de Firebase, se registra en la consola
  //     if (error.code) {
  //       console.error('Codigo de error de Firebase:', error.code);

  //       // Mensajes específicos según el código de error
  //       if (error.code === 'auth/wrong-password') {
  //         const errorMessage = 'La contraseña ingresada es incorrecta';
  //         await this.toastService.showToast(errorMessage);
  //       } else if (error.code === 'auth/user-not-found') {
  //         const errorMessage = 'No se encontró una cuenta con este correo';
  //         await this.toastService.showToast(errorMessage);
  //       } else if (error.code === 'auth/invalid-credential') {
  //         const errorMessage = 'Las credenciales proporcionadas no son válidas. Verifica tu correo y contraseña.';
  //         await this.toastService.showToast(errorMessage);
  //       } else if (error.code === 'auth/invalid-email'){
  //         const errorMessage = 'Los datos son incorrectos, volvé a intentar!';
  //         await this.toastService.showToast(errorMessage);
  //       }else {
  //         const errorMessage = error.message || 'Ocurrió un error durante el login';
  //         await this.toastService.showToast(errorMessage);
  //       }
  //     }
  //   }
  // }

