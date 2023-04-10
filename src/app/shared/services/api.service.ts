import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  CategoryModel,
  CommentModel,
  PostModel,
  ProfileModel,
  TagModel,
  UserModel,
} from '../../models';
import { ApiModelFactory } from '../factories';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private readonly http: HttpClient) {}

  public users = new ApiModelFactory<UserModel>().build('users', this.http);

  public profiles = new ApiModelFactory<ProfileModel>().build(
    'profiles',
    this.http,
  );

  public posts = new ApiModelFactory<PostModel>().build('posts', this.http);

  public comments = new ApiModelFactory<CommentModel>().build(
    'comments',
    this.http,
  );

  public categories = new ApiModelFactory<CategoryModel>().build(
    'categories',
    this.http,
  );

  public tags = new ApiModelFactory<TagModel>().build('tags', this.http);
}
