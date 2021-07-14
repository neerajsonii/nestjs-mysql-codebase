import { ExecutionContext, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserData } from '../interfaces/auth.interface';
import { decodeToken } from '../utils/token.decode';

const authError = {
    error: 'Unauthorized. Error while authorization verifying token',
    message: '',
    statusCode: HttpStatus.UNAUTHORIZED
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private reflector: Reflector) { }
    canActivate(context: ExecutionContext): boolean {
        const roles = this.reflector.get<string[]>('roles', context.getHandler())
        const request = context.switchToHttp().getRequest();

        if (!request.headers.authorization) {
            authError.message = 'Authorization token not found.'
            throw new UnauthorizedException(authError);
        }

        request.user = this.validateToken(request.headers.authorization);
        
        if (roles && roles.length) {
            this.validateUserRole(request.user.role, roles);
        }
        return true;
    }

    private validateUserRole(userRole: string, requiredRoles: string[]): void {
        if (!requiredRoles.includes(userRole)) {
            authError.message = 'Forbidden resource for the current user. Please check the permissions associated with this user.'
            throw new UnauthorizedException(authError);
        }
     }

    private validateToken(authToken: string): UserData {
        const [prefix, token] = authToken.split(' ');
        if (prefix !== 'Bearer' || !token || token === '') {
            authError.message = 'Invalid token format';
            throw new UnauthorizedException(authError);
        }
        try {
            const decodedTokenData = decodeToken(token);
            return decodedTokenData;
        } catch (error) {
            authError.message = 'Invalid token';
            throw new UnauthorizedException(authError);
        }
    }
}