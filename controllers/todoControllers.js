const mongoose = require("mongoose");

import { useNavigate } from "react-router-dom";
const todoModel = require("../models/todoModel");
const userModel = require("../models/userModel");

exports.getAllTodo = (req, res) => {
  todoModel
    .find()
    .then((todo) => res.json(todo))
    .catch((err) =>
      res.status(404).json({ message: "Todo Not Found", error: err.message })
    );
};

exports.postCreateTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    //validation
    if (!title) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    const newTodo = new todoModel({ title, description });
    await newTodo.save();
    return res.status(201).send({
      success: true,
      message: "Todo Created!",
      newTodo,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).send({
      success: false,
      message: "Error While Creating Todo",
      error: error.message,
    });
  }
};

exports.putUpdateTodo = (req, res) => {
  const navigate = useNavigate();
  todoModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then((data) => res.json({ message: "Updated Successfully", data }))
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to Update Todo", error: err.message })
    );
  navigate("/");
};

exports.deleteTodo = (req, res) => {
  todoModel
    .findByIdAndRemove(req.params.id, req.body)
    .then((data) => res.json({ message: "Todo Deleted Successfully", data }))
    .catch((err) =>
      res.status(404).json({ message: "Not Found", error: err.message })
    );
};
