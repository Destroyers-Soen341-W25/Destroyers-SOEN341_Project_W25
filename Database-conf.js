//Firestore Database connection
import { initializeApp, cert } from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';
const firebaseConfig={
    "type": "service_account",
    "project_id": "soen341-destroyers",
    "private_key_id": "fc380072e2dd127910505a88cd7cb678ac07192c",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCvgJ5w6Jq2neyl\n+6y/poxEVOK90xe1XljoApB/MtnUMPBmjyCs8ShYf1Z4Azqo9+nfJ80NKoyd46Lm\nGKUHj0Ob+v7YuefKS5LnlDh/cpEUuGswVpNcw6IBOtMiMAjRNkEGl45OBk9FH4FQ\nZ2vWPWeOSvJHuSkvdgiVSqwFOliK1BS3TQCUbenPSGaC84dL9s9SXhKcK4tFjPO/\n1oM4/GUpi7xRIOrGj+XakspIK225Zjpt/BFNk9aNcjk/6vbrxhsc7oLQNgAbGY+J\n9ec/aeOLbrp+4Hoa5iklUr7HBO6//dCFFLzR3OFDo7T6iz1dBk7X6vz6PKcmPALy\nWdBUp1wPAgMBAAECggEACYDjU4WM/IQ7EIE7NATpReP7g+rz4YrdMUcTmwezuvqh\ncfRLK9eX5zQ8svKoe7DdCwv6iGgm8Cp8+OJvFqSKiojswZX44r/1PFwO3nvji6Xc\nNrm2xh2uiUwtqwVt3M0IIrq/O84PVH9lvxGynwnOheqHXxyRid6QOBawj6HpXIRo\nqbHxIWf0aJyhqxHqwVbVOWXhos2rOPWN1Q2XtzsbeBjsu/TFLlG8NmLQlInWx1Id\nfp67nuKTpAWuSh45zx49IhOsdhULaxV+G3bc18jrC1pLYeIAgqpYGJXJOf9KgvM3\nvNp3EErk+U1O+jht2oxXuATnAya9/vYVplPITWCfcQKBgQDxk+w7g5WWN5EjPTNo\nh2ncB1AvDXvL8bQX1sfXasj4xRvR7TsBEwp96WzPz0wwy5xQOObaXbHrijR3GbmC\neAZi+l96CTcSb2np9+KzI6Kyh27vLW2aXSSRkWTvL8cOW7BCEV4MKMmgTf3SlEn2\n2K45uhZKS8Y8vvj39uBno7FicQKBgQC5+tqVq8/W/wxgIvNWbTL3uZVoG05yD2r2\nVzP1UCrWNrLGLKEYz9c36hnfu2+JNq2dWmWkLdhuIy+9z7yTPdj5Ei+I9Q3x23iL\neOz2DG4mw8X75rgh80q6gkzT/qXfXVAwGsE9cKfSzh71CFcUT8pjKoGO+2z9wFUd\n+Pp5w5bmfwKBgQCJRXze9I5zpW+bjpM/unK0zJMLqaXG5bloMmusRMmeUqLUTvFQ\nUvmLQrDKBQlOUOSp0SucudD3/riBVOTM9lbqt0q5lbLtjtGoWWtAT+eLetnWnwHA\nzVySOwQXxhZeWkt1v1ipoCOyK58noYvF8KpPsyYnYZdrvTjL7kTln2aUgQKBgAKv\n+EafY/J0XwZomuGN1GW1/c2yT1DgnigPHIYX8XaE9dJdRLqqDi8Vp+gOuk7eRmX2\nr29O5ki5I3B3tv7druvyclNlTx1GkZhaV/o6NcFDpPG95L1A2byWM2wAyv7OR2Fa\nkZ5EqXgnWFUsGK4HdSI3tAWP5oRIKjKzrVLjG6QbAoGBAKC990zfaTwt3xR3w30D\nxeEAJtF3SoiBSMCFaa7lmpkgdBH1f6GkGD5F8yFr1TmQfoTWZgH7H87WMfyAByV0\ndwdt5U1nP1u9tncpcSML5XEWq0X7drJmZKhHUTbWxkQ2HVgbMmsVSNnGedNATAPt\nyzlKRCHl0GDDX+xH0ndmad9B\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-fbsvc@soen341-destroyers.iam.gserviceaccount.com",
    "client_id": "115093482119723319143",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://oauth2.googleapis.com/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40soen341-destroyers.iam.gserviceaccount.com",
    "universe_domain": "googleapis.com"
  };

initializeApp({
  credential: cert(firebaseConfig),
});

const db = getFirestore();
export default db;

// import { initializeApp, cert } from 'firebase-admin/app';
// import { getFirestore } from 'firebase-admin/firestore';
// import dotenv from 'dotenv';
//
// // Load environment variables
// dotenv.config();
//
// const firebaseConfig = {
//     type: "service_account",
//     project_id: process.env.FIREBASE_PROJECT_ID,
//     private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
//     private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
//     client_email: process.env.FIREBASE_CLIENT_EMAIL,
//     client_id: process.env.FIREBASE_CLIENT_ID,
//     auth_uri: process.env.FIREBASE_AUTH_URI,
//     token_uri: process.env.FIREBASE_TOKEN_URI,
//     auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
//     client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL,
//     universe_domain: process.env.FIREBASE_UNIVERSE_DOMAIN
// };
//
// // Initialize Firebase Admin SDK
// initializeApp({
//     credential: cert(firebaseConfig),
// });
//
// const db = getFirestore();
// export default db;




// //Firestore Database connection
// const { initializeApp, cert } = require( 'firebase-admin/app');
// import {getFirestore} from 'firebase-admin/firestore';
// //import {app} from "firebase-admin";
// const app = initializeApp();
//
// const firebaseConfig={
//     type: "service_account",
//     project_id: "soen341-destroyers",
//     private_key_id: "02dc1e946ca314e5dc101dd2e31ad01b8899e11a",
//     private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDAO6eGS3JrbChL\nk1gz984omr7jnmOBsVJNoVlOS4olMS0ggtFXftIYQd0NMUK8VpK71Q084H6OoJ0E\n78gShee/xBa1nbYXyD7UWRuQ7z0pgYb3rKbYBqBqj5KtLO4t+ZQSpP4SVL7CjN8i\npjo/Adg0jdV1NVy3UHkxLE+spz6nwuOMMMbWGxFEWEFip3RYjJB4G9fvow3Mk5HX\nAHCXkBWNko6bF+qIiD0ItuucCtr82r9+6fMt5JlnFL+ySg1GSu+N/hmdpBhg9/xM\nUV50VVg6Bxe8NHTf/fg0e5uvYLkr3pklurSpDjkx5acbgUh5kcuoHfw1oX1mP0kV\nw24/B5BTAgMBAAECggEAQpbnix+rfQa0VqmtziKzKWGhalu9gHmaVwXjV7nXGtcU\nGMT4G2T1Bi4akq1TvsYGgkZlFYd2j5WXjtQ47CGyi70zWKpPH6HgEdLkN6qH907F\nIBqQmRiCjSc62f5Ma2SfJG4/DL6Kbf46dVg7qQPMjzfqj3VyrpWTxbLhzp8IlzfT\nfNt9wjrkRuyIqFdPviLUcvXL+2cUfewEkDeN/nUYOySr8hG3JRD+SdjoHU3MS86v\nv3kSQ+KftjaswpDwlE3ww00khrrY+RFajF3DnAcv7YJuzlPxTVzqtsQVOEB+lPgU\njOQwaliH146xtiuvZWz0kmlM7mShiv8sFqABttoksQKBgQDrzCXz861Lor7vc/zw\nO8nOAcXcYamLTWnjXFyDMJV1kneY4n4TnBQdeKtEKLWHzj4T3a1E6A9yftbT/U6y\neFiHub8duDTZWK0kseN66VJvkGjpu3+71W+VayE4O1/vXeqvplJwApI3dB/hUR3+\nEjViNtRLtiXDdjOMVIoxO1AXXwKBgQDQs/zmzU/Q15q5Gk5/oWlaRPbjYv/CFcoB\nhFB0vj9Ey80jss8BikdLiB2sqGyargabdR0tU3ebOf4P3jwdPjuZ0LTNnmZAOol0\nMUK+vR2Fn8fart/72e3ltfLNZ1qhX3UxF7640LFu1F1cL/N/+jM64KgJUMIdfb0g\nqs4EZYfvjQKBgBjDuRy08/dkoU7+zIrijKBROVma/DaAK+XQFntEx/2wI1VwPDON\nCePKf5pJ+D7KH2TwvDjncm/g+GkNSo2d7BZdIMBbT1mgYZbgA/ctuBW1gf9CTPkK\nQozb0oJYYgv+vh4yhqfy7S5byNleLps3iFnHTmahO7gamvFbE6R2CURbAoGAARyE\nQ0Jio20SgNvYASv94KIvYmSbkhAFpF5tA0IkGhyvufnwykRPPuK5rbqz4Vr95AQK\npLwmDeiQJst7LHixXo9S9ylZyAvHwZuljFh7eMOyD8MQpEmzz55ZbaiYPfXBLQLA\nXEGYQEvXN29173+ImE6r9mi8r+WEhVEDidh0kd0CgYEAlXxt8PHULkP6ZGs7k0JJ\nwG4G578aUcPq9AKHlWLob9ICTFow7fru8LoVua0L+DoWynIWk0WWHhMGR4o5u+GA\n8U9Lq4WoXvJPIKYZawNDRTwAtove8MYpRVEVUakhQjp3eD/iyY960m+zRgsHv27V\nF8paYh5j5ZE80yvfwxJM1SM=\n-----END PRIVATE KEY-----\n",
//     client_email: "firebase-adminsdk-fbsvc@soen341-destroyers.iam.gserviceaccount.com",
//     client_id: "115093482119723319143",
//     auth_uri: "https://accounts.google.com/o/oauth2/auth",
//     token_uri: "https://oauth2.googleapis.com/token",
//     auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
//     client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40soen341-destroyers.iam.gserviceaccount.com",
//     universe_domain: "googleapis.com"
//
// };
//
// initializeApp({
//     credential: cert(firebaseConfig),
// });
// export default app;






// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import {getFirestore} from 'firebase-admin/firestore';
// import { getAuth } from "firebase/auth";
//
//
// const firebaseConfig = {
//     apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
//     authDomain: "soen341-destroyers.firebaseapp.com",
//     projectId: "soen341-destroyers",
//     storageBucket: "soen341-destroyers.firebasestorage.app",
//     messagingSenderId: "331090980616",
//     appId: "1:331090980616:web:5b750c10bd26a5609246bd",
//     measurementId: "G-09CJD9DEC0"
// };
//
// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
//
// const db = getFirestore();
// const auth = getAuth(app);
//
// export default { app,auth, db };
