import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";

export interface IUserTemp extends Document {
    name: string;
    email: string;
    password: string;
    role: string;
    university: ObjectId;
    department: string;
    faculty: string;
    level?: string;
    otp: string;
    otpExpires: Date;
}

const UserTempSchema: Schema<IUserTemp> = new Schema({
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
    otp: {
        type: String,
        required: true,
    },
    otpExpires: {
        type: Date,
        required: true,
    },
});

const UserTemp: Model<IUserTemp> = mongoose.models.UserTemp || mongoose.model<IUserTemp>("UserTemp", UserTempSchema);

export default UserTemp;