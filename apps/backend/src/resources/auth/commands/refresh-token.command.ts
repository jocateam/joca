export class RefreshTokenCommand {
  constructor(
    private readonly _refreshToken: string,
    private readonly _jwt: string
  ) {}

  get refreshToken(): string {
    return this._refreshToken;
  }

  get jwt(): string {
    return this._jwt;
  }
}
