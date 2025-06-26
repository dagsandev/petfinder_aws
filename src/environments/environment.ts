export const environment = {
  production: true,
  apiUrl: 'https://dog.ceo/api/',

  // Cognito config para auth/login
  cognito: {
    authority: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_VzbseCktm',
    clientId: '4hg4dihcralsa2udctlncg2ns1',
    //redirectUrl: 'https://d84l1y8p4kdic.cloudfront.net',
    redirectUrl: 'https://main.d2t9i4brlk3x5o.amplifyapp.com/tabs/tab1',
    postLogoutRedirectUri: 'https://main.d2t9i4brlk3x5o.amplifyapp.com/login',
    scope: 'openid email phone',
    responseType: 'code'
  }
};
