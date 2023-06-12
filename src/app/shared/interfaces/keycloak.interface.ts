export interface IKeycloakCreateUserData {
  email: string;
  password: string;
  username?: string;
  firstName?: string;
  lastName?: string;
  requiredActions?: string[];
  emailVerified?: boolean;
  groups?: any[];
  enabled?: boolean;
}
