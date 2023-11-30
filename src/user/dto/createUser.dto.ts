export class CreateUserDto {
  username: string;
  email?: string;
  password: string;
  name?: string;
  role: string;
  page?: number;
  firstName?: string;
  lastName?: string;
}
