import { BaseModel } from './base.model';
import { CommentModel } from './comment.model';
import { TagModel } from './tag.model';

export const PostType = {
  TEXT: 'TEXT',
  GALLERY: 'GALLERY',
  PAGE: 'PAGE',
} as const;

export class PostModel extends BaseModel {
  public title: string;

  public content: string;

  public mainImage: string;

  public images: string[];

  public type: typeof PostType[keyof typeof PostType];

  public published: boolean;

  public authorId: string;

  public categoryId: string;

  public tags: TagModel[] = [];

  public comments: CommentModel[] = [];

  constructor(data: PostModel) {
    super(data);

    ({
      title: this.title,
      content: this.content,
      mainImage: this.mainImage,
      images: this.images,
      type: this.type,
      published: this.published,
      authorId: this.authorId,
      categoryId: this.categoryId,
    } = data);

    if (data.tags.length) {
      this.tags = data.tags.map((tag) => new TagModel(tag));
    }

    if (data.comments.length) {
      this.comments = data.comments.map((comment) => new CommentModel(comment));
    }
  }
}
