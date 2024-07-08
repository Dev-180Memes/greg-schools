import mongoose, { Schema, Document, Model } from "mongoose";

export interface IReset extends Document {
    email: string;
    token: string;
    expires: Date;
}

const ResetSchema: Schema<IReset> = new Schema({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    expires: {
        type: Date,
        required: true,
    },
});

const Reset: Model<IReset> = mongoose.models.Reset || mongoose.model<IReset>("Reset", ResetSchema);

export default Reset;