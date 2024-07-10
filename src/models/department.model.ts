import mongoose, { Schema, Model, Document, ObjectId } from "mongoose";

export interface IDepartment extends Document {
    name: string;
    collegeFaculty: ObjectId;
    levels: number;
    dateRegistered: Date;
}

const DepartmentSchema: Schema<IDepartment> = new Schema({
    name: {
        type: String,
        required: true,
    },
    collegeFaculty: {
        type: Schema.Types.ObjectId,
        ref: "CollegeFaculty",
        required: true,
    },
    levels: {
        type: Number,
        default: 0,
    },
    dateRegistered: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Department: Model<IDepartment> = mongoose.models.Department || mongoose.model("Department", DepartmentSchema);

export default Department;