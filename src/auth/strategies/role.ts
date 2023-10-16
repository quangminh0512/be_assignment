import { SetMetadata } from '@nestjs/common';
// import { Role } from 'src/users/entities/role.enum';

export const Roles = (...roles: string[]) => SetMetadata('roles', roles);
