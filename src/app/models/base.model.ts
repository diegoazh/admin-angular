export abstract class BaseModel {
  public id: string;

  public createdAt: string;

  public updatedAt: string;

  constructor(data: BaseModel) {
    ({
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    } = data);
  }
}
