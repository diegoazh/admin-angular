export const UserRoles = {
  USER: 'USER',
  COLLABORATOR: 'COLLABORATOR',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
} as const;

export class UserModel {
  public access: {
    manageGroupMembership: boolean;
    view: boolean;
    mapRoles: boolean;
    impersonate: boolean;
    manage: boolean;
  };

  public createdTimestamp: number;

  public disableableCredentialTypes: any[]; // TODO: fix this any type

  public email: string;

  public emailVerified: boolean;

  public enabled: boolean;

  public firstName: string;

  public id: string;

  public lastName: string;

  public notBefore: number;

  public requiredActions: string[];

  public totp: boolean;

  public username: string;

  constructor(data: UserModel) {
    ({
      access: this.access,
      createdTimestamp: this.createdTimestamp,
      disableableCredentialTypes: this.disableableCredentialTypes,
      email: this.email,
      emailVerified: this.emailVerified,
      enabled: this.enabled,
      firstName: this.firstName,
      id: this.id,
      lastName: this.lastName,
      notBefore: this.notBefore,
      requiredActions: this.requiredActions,
      totp: this.totp,
      username: this.username,
    } = data);
  }

  public static isUser(data: any): data is UserModel {
    if (typeof data === 'object') {
      const keys = Object.keys(data);
      return (
        keys.includes('email') &&
        keys.includes('emailVerified') &&
        keys.includes('access')
      );
    }

    return false;
  }
}
