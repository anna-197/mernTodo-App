
const mongoose = require("mongoose");
const todoModel = require("../models/todoModel");
const userModel = require("../models/userModel");

exports.getAllTodo = (req, res) => {
    todoModel.find()
        .then((todo) => res.json(todo))
        .catch((err) =>
            res
                .status(404)
                .json({ message: "Todo not found", error: err.message })
        );
};

exports.postCreateTodo = async (req, res) => {
  try {
    const { title, description, user } = req.body;
    // Validation
    if (!title || !description || !user) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const existingUser = await userModel.findById(user);
    // Validation
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: 'Unable to find user',
      });
    }

    const newTodo = new todoModel({ title, description, user });
    const session = await mongoose.startSession();
    session.startTransaction();
    await newTodo.save({ session });

    existingUser.todo.push(newTodo);
    await existingUser.save({ session });

    await session.commitTransaction();
    session.endSession();

    return res.status(201).send({
      success: true,
      message: "Todo Created!",
      newTodo,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Creating todo",
      error: error.message,
    });
  }
};


exports.putUpdateTodo = (req, res) => {
    todoModel.findByIdAndUpdate(req.params.id, req.body)
        .then((data) => res.json({ message: "updated successfully", data }))
        .catch((err) =>
            res
                .status(400)
                .json({ message: "Failed to update todo", error: err.message })
        );
};

exports.deleteTodo = (req, res) => {
    todoModel.findByIdAndRemove(req.params.id, req.body)
        .then((data) =>
            res.json({ message: "todo deleted successfully", data })
        )
        .catch((err) =>
            res
                .status(404)
                .json({ message: "book not found", error: err.message })
        );
};

//GET USER BLOG
exports.userTodoController = async (req, res) => {
  try {
    const userTodo = await userModel.findById(req.params.id).populate("todo");
    if (!userTodo) {
      return res.status(404).send({
        success: false,
        message: "todos not found with this id",
      });
    }
    return res.status(200).send({
      success: true,
      message: "user todos",
      userTodo,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "error in user todo",
      error,
    });
  }
};