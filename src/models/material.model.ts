import mongoose, { Schema, Document, Model, ObjectId } from "mongoose";

export interface IMaterial extends Document {
    name: string;
    course: ObjectId;
    fileUrl: string;
    dateRegistered: Date;
}

const MaterialSchema: Schema<IMaterial> = new Schema({
    name: {
        type: String,
        required: true,
    },
    course: {
        type: Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    fileUrl: {
        type: String,
        required: true,
    },
    dateRegistered: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Material: Model<IMaterial> = mongoose.models.Material || mongoose.model("Material", MaterialSchema);

export default Material;