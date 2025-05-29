import { NgModule } from '@angular/core';
import { AuthModule } from 'angular-auth-oidc-client';
import { environment } from '../../environments/environment';


@NgModule({
    imports: [AuthModule.forRoot({
        config: {
            //authority: 'https://login.microsoftonline.com/https://cognito-idp.us-east-1.amazonaws.com/us-east-1_VzbseCktm/v2.0',
            authority: environment.cognito.domain,
            //authWellknownEndpointUrl: 'https://login.microsoftonline.com/common/v2.0',
            //authWellknownEndpointUrl: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_VzbseCktm/v2.0.well-known/openid-configuration',
            //redirectUrl: window.location.origin,
            clientId: environment.cognito.clientId,
            redirectUrl: environment.cognito.redirectUri,
            postLogoutRedirectUri: environment.cognito.postLogoutRedirectUri,
            scope: environment.cognito.scope, // 'openid profile offline_access ' + your scopes
            responseType: environment.cognito.responseType,
            silentRenew: true,
            useRefreshToken: true,
            maxIdTokenIatOffsetAllowedInSeconds: 600,
            issValidationOff: false,
            autoUserInfo: false,
            customParamsAuthRequest: {
              prompt: 'select_account', // login, consent
            },
            secureRoutes:[],
            startCheckSession: false
    }
      })],
    exports: [AuthModule],
})
export class AuthConfigModule {}
