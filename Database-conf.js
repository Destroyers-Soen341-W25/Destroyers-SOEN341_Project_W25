//Firestore Database connection
import { initializeApp, cert } from 'firebase-admin/app';
import {getFirestore} from 'firebase-admin/firestore';
const firebaseConfig={
        "type": "service_account",
        "project_id": "soen341-destroyers",
        "private_key_id": "02dc1e946ca314e5dc101dd2e31ad01b8899e11a",
        "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDAO6eGS3JrbChL\nk1gz984omr7jnmOBsVJNoVlOS4olMS0ggtFXftIYQd0NMUK8VpK71Q084H6OoJ0E\n78gShee/xBa1nbYXyD7UWRuQ7z0pgYb3rKbYBqBqj5KtLO4t+ZQSpP4SVL7CjN8i\npjo/Adg0jdV1NVy3UHkxLE+spz6nwuOMMMbWGxFEWEFip3RYjJB4G9fvow3Mk5HX\nAHCXkBWNko6bF+qIiD0ItuucCtr82r9+6fMt5JlnFL+ySg1GSu+N/hmdpBhg9/xM\nUV50VVg6Bxe8NHTf/fg0e5uvYLkr3pklurSpDjkx5acbgUh5kcuoHfw1oX1mP0kV\nw24/B5BTAgMBAAECggEAQpbnix+rfQa0VqmtziKzKWGhalu9gHmaVwXjV7nXGtcU\nGMT4G2T1Bi4akq1TvsYGgkZlFYd2j5WXjtQ47CGyi70zWKpPH6HgEdLkN6qH907F\nIBqQmRiCjSc62f5Ma2SfJG4/DL6Kbf46dVg7qQPMjzfqj3VyrpWTxbLhzp8IlzfT\nfNt9wjrkRuyIqFdPviLUcvXL+2cUfewEkDeN/nUYOySr8hG3JRD+SdjoHU3MS86v\nv3kSQ+KftjaswpDwlE3ww00khrrY+RFajF3DnAcv7YJuzlPxTVzqtsQVOEB+lPgU\njOQwaliH146xtiuvZWz0kmlM7mShiv8sFqABttoksQKBgQDrzCXz861Lor7vc/zw\nO8nOAcXcYamLTWnjXFyDMJV1kneY4n4TnBQdeKtEKLWHzj4T3a1E6A9yftbT/U6y\neFiHub8duDTZWK0kseN66VJvkGjpu3+71W+VayE4O1/vXeqvplJwApI3dB/hUR3+\nEjViNtRLtiXDdjOMVIoxO1AXXwKBgQDQs/zmzU/Q15q5Gk5/oWlaRPbjYv/CFcoB\nhFB0vj9Ey80jss8BikdLiB2sqGyargabdR0tU3ebOf4P3jwdPjuZ0LTNnmZAOol0\nMUK+vR2Fn8fart/72e3ltfLNZ1qhX3UxF7640LFu1F1cL/N/+jM64KgJUMIdfb0g\nqs4EZYfvjQKBgBjDuRy08/dkoU7+zIrijKBROVma/DaAK+XQFntEx/2wI1VwPDON\nCePKf5pJ+D7KH2TwvDjncm/g+GkNSo2d7BZdIMBbT1mgYZbgA/ctuBW1gf9CTPkK\nQozb0oJYYgv+vh4yhqfy7S5byNleLps3iFnHTmahO7gamvFbE6R2CURbAoGAARyE\nQ0Jio20SgNvYASv94KIvYmSbkhAFpF5tA0IkGhyvufnwykRPPuK5rbqz4Vr95AQK\npLwmDeiQJst7LHixXo9S9ylZyAvHwZuljFh7eMOyD8MQpEmzz55ZbaiYPfXBLQLA\nXEGYQEvXN29173+ImE6r9mi8r+WEhVEDidh0kd0CgYEAlXxt8PHULkP6ZGs7k0JJ\nwG4G578aUcPq9AKHlWLob9ICTFow7fru8LoVua0L+DoWynIWk0WWHhMGR4o5u+GA\n8U9Lq4WoXvJPIKYZawNDRTwAtove8MYpRVEVUakhQjp3eD/iyY960m+zRgsHv27V\nF8paYh5j5ZE80yvfwxJM1SM=\n-----END PRIVATE KEY-----\n",
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