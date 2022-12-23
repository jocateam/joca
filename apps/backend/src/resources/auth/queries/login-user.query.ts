export class LoginUserQuery {
  constructor(
    private readonly _email: string,
    private readonly _password: string
  ) {}

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}
