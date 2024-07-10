import mongoose, { Schema, Model, Document, ObjectId } from "mongoose";

export interface ICourse extends Document {
    name: string;
    level: ObjectId;
    materials: number;
    dateRegistered: Date;
}

const CourseSchema: Schema<ICourse> = new Schema({
    name: {
        type: String,
        required: true,
    },
    level: {
        type: Schema.Types.ObjectId,
        ref: "Level",
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

const Course: Model<ICourse> = mongoose.models.Course || mongoose.model("Course", CourseSchema);

export default Course;