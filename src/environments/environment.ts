export const environment = {
  production: false,
  apiUrl: 'https://app.starter.io',
  siteTitle: 'Admin Starter',
  auth: {
    issuer: 'https://auth.starter.io/realms/backend',
    clientId: 'nestjs-app',
    clientSecret: 'QwslcqzF7Jkdz0cI8zjJ10l97uKxQ1P2',
    responseType: 'code',
    scope: 'openid profile email',
    oidc: true,
    loginUrl:
      'https://auth.starter.io/realms/backend/protocol/openid-connect/auth',
    tokenEndpoint:
      'https://auth.starter.io/realms/backend/protocol/openid-connect/token',
    userInfoEndpoint:
      'https://auth.starter.io/realms/backend/protocol/openid-connect/userinfo',
    requireHttps: true,
  },
};
