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
}
