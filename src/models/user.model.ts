import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    university: ObjectId;
    department: string;
    faculty: string;
    level?: string;
    comparePassword(password: string): Promise<boolean>;
}

const UserSchema: Schema<IUser> = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
    },
    university: {
        type: Schema.Types.ObjectId,
        ref: "School",
    },
    department: {
        type: String,
    },
    faculty: {
        type: String,
    },
    level: {
        type: String,
    },
});

UserSchema.pre<IUser>("save", async function (next) {
    if (this.isModified("password")) {
        next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error: any) {
        next(error);
    }
});

UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
    return await bcrypt.compare(password, this.password);
};

const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;