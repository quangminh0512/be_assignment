export class CreateUserDto {
  studentId?: string;
  username: string;
  email?: string;
  password: string;
  name?: string;
  role: string;
  pages?: number;
  balance?: number;
  firstName?: string;
  lastName?: string;
}
