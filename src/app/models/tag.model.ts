import { BaseModel } from './base.model';
import { PostModel } from './post.model';

export class TagModel extends BaseModel {
  public name: string;

  public posts?: PostModel[] = [];

  constructor(data: TagModel) {
    super(data);

    this.name = data.name;

    if (data.posts?.length) {
      this.posts = data.posts.map((post) => new PostModel(post));
    }
  }

  public static isTag(data: any): data is TagModel {
    if (typeof data === 'object') {
      const keys = Object.keys(data);
      return keys.includes('name');
    }

    return false;
  }
}
