import { BaseModel } from './base.model';

export class ProfileModel extends BaseModel {
  public bio: string;

  public firstName: string;

  public lastName: string;

  public userId: string;

  constructor(data: ProfileModel) {
    super(data);

    ({
      bio: this.bio,
      firstName: this.firstName,
      lastName: this.lastName,
      userId: this.userId,
    } = data);
  }

  public static isProfile(data: any): data is ProfileModel {
    if (typeof data === 'object') {
      const keys = Object.keys(data);
      return (
        keys.includes('bio') &&
        keys.includes('firstName') &&
        keys.includes('lastName') &&
        keys.includes('userId')
      );
    }

    return false;
  }
}
