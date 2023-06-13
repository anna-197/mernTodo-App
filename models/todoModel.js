
const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
    title: {
        type: "String",
        required: true,
    },
    description: {
        type: "String",
    },
    user:{
        type:mongoose.Types.ObjectId,
        ref: 'User',
        required: true,
    }
});

const todoModel = mongoose.model("Todo", TodoSchema);

module.exports = todoModel;