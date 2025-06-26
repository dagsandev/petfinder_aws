import { Component, OnInit, inject } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { HttpClient } from '@angular/common/http';

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

  login(): void {
    console.log("click en login");
    this.oidcSecurityService.authorize();
}

  logout(): void {
    if (window.sessionStorage) {
      window.sessionStorage.clear();
    }
    this.oidcSecurityService.logoff();
  }
}
