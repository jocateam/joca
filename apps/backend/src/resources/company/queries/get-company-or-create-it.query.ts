export class GetCompanyOrCreateItQuery {
  constructor(
    private readonly _name: string,
    private readonly _size: string,
    private readonly _domain: string
  ) {}

  get name(): string {
    return this._name;
  }

  get size(): string {
    return this._size;
  }

  get domain(): string {
    return this._domain;
  }
}
