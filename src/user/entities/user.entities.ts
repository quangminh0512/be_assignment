export enum Role {
  Admin = 'admin',
  User = 'user',
}

type User = {
  id?: string;
  userName: string;
  password: string;
  role: Role;
};

export interface IAuthenticate {
  readonly user: User;
  readonly token: string;
}
