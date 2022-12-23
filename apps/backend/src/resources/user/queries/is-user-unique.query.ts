export class IsUserUniqueQuery {
  constructor(private readonly _email: string) {}

  get email(): string {
    return this._email;
  }
}
