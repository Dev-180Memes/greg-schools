import mongoose, { Schema, Model, Document, ObjectId } from "mongoose";

export interface ILevel extends Document {
    name: string;
    department: ObjectId;
    courses: number;
    dateRegistered: Date;
}

const LevelSchema: Schema<ILevel> = new Schema({
    name: {
        type: String,
        required: true,
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: "Department",
        required: true,
    },
    courses: {
        type: Number,
        default: 0,
    },
    dateRegistered: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Level: Model<ILevel> = mongoose.models.Level || mongoose.model("Level", LevelSchema);

export default Level;