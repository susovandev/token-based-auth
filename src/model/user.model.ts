import { IUser } from '@/interface/user.interface';
import { Schema, model } from 'mongoose';

const userSchema: Schema<IUser> = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            trim: true,
        },
        role: {
            type: String,
            enum: ['user', 'admin', 'superadmin'],
            default: 'user',
        },
    },
    { timestamps: true },
);

const User = model<IUser>('User', userSchema);
export default User;
