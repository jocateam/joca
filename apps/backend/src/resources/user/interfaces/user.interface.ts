export interface UserInterface {
  id?: number;

  email: string;
  firstname: string;
  lastname: string;
  password: string;
  salt: string;
  token: string;
  tokenValidityDate: Date;
}
