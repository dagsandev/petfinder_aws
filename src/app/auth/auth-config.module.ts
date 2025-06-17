import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';
import { environment } from '../../environments/environment';


@NgModule({
    imports: [
      AuthModule.forRoot({
        config: {
            authority: environment.cognito.authority,
            redirectUrl: environment.cognito.redirectUrl,
            clientId: environment.cognito.clientId,
            postLogoutRedirectUri: environment.cognito.postLogoutRedirectUri,
            scope: environment.cognito.scope,
            responseType: environment.cognito.responseType,    
          },
      }),
    ],
    exports: [AuthModule],
})
export class AuthConfigModule {}
