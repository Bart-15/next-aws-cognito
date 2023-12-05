import { Amplify } from 'aws-amplify';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: process.env.AWS_COGNITO_POOL_ID!,
      userPoolClientId: process.env.AWS_COGNITO_APP_CLIENT_ID!,
    },
  },
});
