import {
  UserModel,
  PostModel,
  CategoryModel,
  CommentModel,
  ProfileModel,
  TagModel,
} from '../../models';

export type ApiModels =
  | 'categories'
  | 'comments'
  | 'posts'
  | 'profiles'
  | 'tags'
  | 'users';

export type DynamicAppModels<
  T extends
    | UserModel
    | PostModel
    | CategoryModel
    | CommentModel
    | ProfileModel
    | TagModel,
> = T extends UserModel
  ? UserModel
  : T extends PostModel
  ? PostModel
  : T extends CategoryModel
  ? CategoryModel
  : T extends CommentModel
  ? CommentModel
  : T extends ProfileModel
  ? ProfileModel
  : TagModel;
