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
