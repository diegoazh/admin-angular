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
}
