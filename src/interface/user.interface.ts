import { Document } from 'mongoose';

export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    role: 'user' | 'admin' | 'superadmin';
    createdAt: Date;
    updatedAt: Date;
    comparePassword(password: string): Promise<boolean>;
    getSignedJwtToken(): string;
}

export interface IUserRequestBody {
    username: string;
    email: string;
    password: string;
}

export interface IChangePasswordDTO {
    user: IUser;
    oldPassword: string;
    newPassword: string;
}
