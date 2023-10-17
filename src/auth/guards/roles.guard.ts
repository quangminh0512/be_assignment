import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  matchRoles(roles: string[], userRole: string) {
    return roles.some((role) => role === userRole);
  }

  canActivate(context: ExecutionContext): boolean {
    const requiredRole = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRole) {
      return true;
    }
    const req = context.switchToHttp().getRequest();
    const user = req.user;
    return this.matchRoles(requiredRole, user.role);
  }
}
