import { SetMetadata } from '@nestjs/common';
import { userTypes } from 'src/shared/schema/user.schema';

export const ROLES_KEY = 'roles';

/**
 * Roles Decorator
 */
export const Roles = (...roles: userTypes[]) => SetMetadata(ROLES_KEY, roles);
