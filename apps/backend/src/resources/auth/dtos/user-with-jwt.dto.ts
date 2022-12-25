import { UserInterface } from '../../user/interfaces/user.interface';

export type UserWithJwtDto = UserInterface & { access_token: string };
