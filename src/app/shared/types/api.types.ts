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

export type AppModels =
  | CategoryModel
  | CommentModel
  | PostModel
  | ProfileModel
  | TagModel
  | UserModel;

export type DataApiResponse =
  | AppModels[]
  | AppModels
  | number
  | undefined
  | void
  | { error?: string; errorMessage?: string };

export type DefineAppModels<T extends AppModels | AppModels[]> =
  T extends UserModel[]
    ? UserModel[]
    : T extends PostModel[]
    ? PostModel[]
    : T extends CategoryModel[]
    ? CategoryModel[]
    : T extends CommentModel[]
    ? CommentModel[]
    : T extends ProfileModel[]
    ? ProfileModel[]
    : T extends TagModel[]
    ? TagModel[]
    : T extends UserModel
    ? UserModel
    : T extends PostModel
    ? PostModel
    : T extends CategoryModel
    ? CategoryModel
    : T extends CommentModel
    ? CommentModel
    : T extends ProfileModel
    ? ProfileModel
    : T extends TagModel
    ? TagModel
    : unknown;

export type ApiResponse<T extends DataApiResponse> = T extends AppModels[]
  ? DefineAppModels<T>
  : T extends AppModels
  ? DefineAppModels<T>
  : T extends number
  ? number
  : T extends void
  ? void
  : Error;
