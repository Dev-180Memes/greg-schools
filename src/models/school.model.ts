import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";

export interface ISchool extends Document {
    name: string;
    collegeFaculty: number;
    departments: number;
    materials: number;
    dateRegistered: Date;
}

const SchoolSchema: Schema<ISchool> = new Schema({
    name: {
        type: String,
        required: true,
    },
    collegeFaculty: {
        type: Number,
        required: true,
    },
    departments: {
        type: Number,
        required: true,
    },
    materials: {
        type: Number,
        default: 0,
    },
    dateRegistered: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const School: Model<ISchool> = mongoose.models.School || mongoose.model<ISchool>("School", SchoolSchema);

export default School;