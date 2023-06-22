import { BaseModel } from './base.model';
import { PostModel } from './post.model';

export class CategoryModel extends BaseModel {
  public name: string;

  public parentId: string;

  public posts?: PostModel[] = [];

  constructor(data: CategoryModel) {
    super(data);

    this.name = data.name;
    this.parentId = data.parentId;

    if (data.posts?.length) {
      this.posts = data.posts.map((post) => new PostModel(post));
    }
  }

  public static isCategory(data: any): data is CategoryModel {
    if (typeof data === 'object') {
      const keys = Object.keys(data);
      return keys.includes('name') && keys.includes('parentId');
    }

    return false;
  }
}
