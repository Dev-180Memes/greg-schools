import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";

export interface ICollegeFaculty extends Document {
    name: string;
    university: ObjectId;
    departments: number;
    dateRegistered: Date;
}

const CollegeFacultySchema: Schema<ICollegeFaculty> = new Schema({
    name: {
        type: String,
        required: true,
    },
    university: {
        type: Schema.Types.ObjectId,
        ref: "School",
        required: true,
    },
    departments: {
        type: Number,
        default: 0,
    },
    dateRegistered: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const CollegeFaculty: Model<ICollegeFaculty> = mongoose.models.CollegeFaculty || mongoose.model("CollegeFaculty", CollegeFacultySchema);

export default CollegeFaculty;