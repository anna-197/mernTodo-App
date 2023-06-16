
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: {
        type: "String",
        required: true,
    },
    description: {
        type: "String",
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: [true, "user id is required"],
      },
});

const todoModel = mongoose.model("Todo", TodoSchema);

module.exports = todoModel;