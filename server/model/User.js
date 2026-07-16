import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: false
        },
        role: {
            type: String,
            default: "admin"
        },
        order: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    },
    {timestamps: true}
);

const User = mongoose.model("User",userSchema);

export default User;