export class RegisterUserQuery {
  constructor(
    private readonly _email: string,
    private readonly _firstname: string,
    private readonly _lastname: string,
    private readonly _password: string
  ) {}

  get email(): string {
    return this._email;
  }

  get firstname(): string {
    return this._firstname;
  }

  get lastname(): string {
    return this._lastname;
  }

  get password(): string {
    return this._password;
  }
}
