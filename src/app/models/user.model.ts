import { BaseModel } from './base.model';
import { CommentModel } from './comment.model';
import { PostModel } from './post.model';
import { ProfileModel } from './profile.model';

export const UserRoles = {
  USER: 'USER',
  COLLABORATOR: 'COLLABORATOR',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
} as const;

export class UserModel extends BaseModel {
  public email: string;

  public password: string;

  public role: typeof UserRoles[keyof typeof UserRoles];

  public username: string;

  public image: string;

  public profile?: ProfileModel;

  public posts: PostModel[] = [];

  public comments: CommentModel[] = [];

  constructor(data: UserModel) {
    super(data);

    ({
      email: this.email,
      password: this.password,
      role: this.role,
      username: this.username,
      image: this.image,
    } = data);

    if (data.profile) {
      this.profile = new ProfileModel(data.profile);
    }

    if (data.posts.length) {
      this.posts = data.posts.map((post) => new PostModel(post));
    }

    if (data.comments.length) {
      this.comments = data.comments.map((comment) => new CommentModel(comment));
    }
  }
}
