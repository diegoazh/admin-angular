import { BaseModel } from './base.model';

export class CommentModel extends BaseModel {
  public content: string;

  public authorId: string;

  public postId: string;

  constructor(data: CommentModel) {
    super(data);

    ({
      content: this.content,
      authorId: this.authorId,
      postId: this.postId,
    } = data);
  }

  public static isComment(data: any): data is CommentModel {
    if (typeof data === 'object') {
      const keys = Object.keys(data);
      return (
        keys.includes('content') &&
        keys.includes('authorId') &&
        keys.includes('postId')
      );
    }

    return false;
  }
}
