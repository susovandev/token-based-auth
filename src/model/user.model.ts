import { IUser } from '@/interface/user.interface';
import { Schema, model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { config } from '@/config/_config';
const userSchema: Schema<IUser> = new Schema(
    {
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: true,
            trim: true,
            lowercase: true, // Convert to lowercase
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
            lowercase: true, // Convert to lowercase
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

userSchema.pre('save', async function (next) {
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
    }
    next();
});

userSchema.methods.comparePassword = async function (
    this: IUser,
    password: string,
): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.getSignedJwtToken = function (this: IUser) {
    return jwt.sign({ id: this._id }, config.jwt_secret as jwt.Secret, {
        expiresIn: config.jwt_expires_in as jwt.SignOptions['expiresIn'],
    });
};

const User = model<IUser>('User', userSchema);
export default User;
