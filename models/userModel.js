const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    username: {
        type: "String",
        required: [true, "Username is required"],
    },
    email: {
        type: "String",
        required: [true, "Email is required"],
    },
    password: {
        type: "String",
        required: [true, "Password is required"],
    },
    // todo: [
    //     {
    //         type: mongoose.Types.ObjectId,
    //         ref: 'Todo',
    //         required: [true, "User ID is required"],
    //     },
    // ]
});

const userModel = mongoose.model("User", UserSchema);

module.exports = userModel;