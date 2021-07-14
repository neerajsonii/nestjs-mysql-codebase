
import * as jwt from 'jsonwebtoken';
import { config } from '../../config/config';
import { UserData } from '../interfaces/auth.interface';

export const decodeToken = (token: string): UserData => {
    return jwt.verify(token, config().jwtSecret);
}