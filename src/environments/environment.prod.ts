// // export const environment = {
// //   apiKey: "AIzaSyDKMSKUgk5AxCULbmFQwid7_4S4Ngq5LMg",
// //   authDomain: "petfinder-5b347.firebaseapp.com",
// //   projectId: "petfinder-5b347",
// //   storageBucket: "petfinder-5b347.firebasestorage.app",
// //   messagingSenderId: "918642641494",
// //   appId: "1:918642641494:web:99e5e8b3b3ea85f8fb49f7",
// //   measurementId: "G-E8SW5YN8XL"
// // };

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// export const firebaseConfig  = {
//   apiKey: "AIzaSyDKMSKUgk5AxCULbmFQwid7_4S4Ngq5LMg",
//   authDomain: "petfinder-5b347.firebaseapp.com",
//   projectId: "petfinder-5b347",
//   storageBucket: "petfinder-5b347.firebasestorage.app",
//   messagingSenderId: "918642641494",
//   appId: "1:918642641494:web:99e5e8b3b3ea85f8fb49f7",
//   measurementId: "G-E8SW5YN8XL"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig );
// const analytics = getAnalytics(app);
export const environment = {
  production: true,
  apiUrl: 'https://dog.ceo/api/',

  // Cognito config para auth/login
  cognito: {
    domain: 'https://cognito-idp.us-east-1.amazonaws.com/us-east-1_TNM3wqqf8',
    clientId: '4hg4dihcralsa2udctlncg2ns1',
    redirectUri: 'https://main.d2t9i4brlk3x5o.amplifyapp.com/tabs/tab1',
    postLogoutRedirectUri: 'https://main.d2t9i4brlk3x5o.amplifyapp.com/login',
    // redirectUri: 'http://localhost:8100/tabs',
    // postLogoutRedirectUri: 'http://localhost:8100/login',
    scope: 'openid email phone',
    responseType: 'code'
  }
};
