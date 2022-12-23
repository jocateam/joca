export class CreateCompanyCommand {
  constructor(private readonly _name: string) {}

  get name(): string {
    return this._name;
  }
}
