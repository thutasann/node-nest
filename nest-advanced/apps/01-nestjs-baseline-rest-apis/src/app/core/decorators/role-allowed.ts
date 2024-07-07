import { CustomDecorator, SetMetadata } from '@nestjs/common';

type RolesProps = 'admin' | 'user';

/**
 * Role Allowed Custom Decorator
 * @param roles - roles ['admin', 'user']
 */
export const RoleAllowed = (...roles: RolesProps[]): CustomDecorator<string> =>
	SetMetadata('roles', roles);
