export enum DataResponseKeys {
  ITEMS = 'items',
  ITEM = 'item',
  COUNT = 'count',
  DELETED = 'deleted',
}

export interface IApiResponse<T> {
  links?: {
    self: string;
    prev?: string;
    next?: string;
    last?: string;
  };

  data: { [key in DataResponseKeys]: T };

  errors?: any[]; // TODO: fix this any type
}
