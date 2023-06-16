
const express = require("express");
const router = express.Router();

const {
    getAllTodo,
    postCreateTodo,
    putUpdateTodo,
    deleteTodo,
    userTodoController,
} = require("../controllers/todoControllers");

/**
 * @route GET api/todo
 * @description get all todo
 * @access public
 */
router.get("/get-all-todos", getAllTodo);

/**
 * @route POST api/todo
 * @description add a new todo
 * @access public
 */
router.post("/create-todo", postCreateTodo);

/**
 * @route PUT api/todo/:id
 * @description update todo
 * @access public
 */
router.put("/update-todo/:id", putUpdateTodo);

/**
 * @route DELETE api/todo/:id
 * @description delete todo
 * @access public
 */
router.delete("/delete-todo/:id", deleteTodo);

router.get("/get-user-todo/:id", userTodoController)

module.exports = router;