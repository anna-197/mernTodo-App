
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
        //validation
        if (!title || !user) {
          return res.status(400).send({
            success: false,
            message: "Please Provide All Fields",
          });
        }
        
        const exisitingUser = await userModel.findById(user);
        //validation
        if(!exisitingUser){
          return res.status(404).send({
            success:false,
            message: 'unable to find user',
          })
        }

        const newTodo = new todoModel({ title, description, user });
        const session = await mongoose.startSession()
        session.startTransaction()
        await newTodo.save({session})
        
        exisitingUser.todo.push(newTodo)
        await exisitingUser.save({session})
        await session.commitTransaction();
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
          message: "Error WHile Creting blog",
          error,
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