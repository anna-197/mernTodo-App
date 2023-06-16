import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoCard from "../components/TodoCard";
import {handleDelete} from "../components/ShowTodos"
import {handleEdit} from "../components/ShowTodos"

const UserTodos = () => {
  const [todos, setTodos] = useState([]);

  //get user todos
  const getUserTodos = async () => {
    try {
      const id = localStorage.getItem("userId");
      const { data } = await axios.get(`http://localhost:8080/api/todo/get-user-todo/${id}`);
      if (data?.success) {
        (setTodos(data?.userTodo.todo));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUserTodos();
  }, []);
  console.log(todos);
  return (
    <div>
      {todos && todos.length > 0 ? (
        todos.map((todo) => (
            <TodoCard
    key={todo._id} // Add key prop here
    data={todo} // Pass the entire todo object as the data prop
    // handleEdit={handleEdit}
    // handleDelete={handleDelete}
  />
        ))
      ) : (
        <h1>You Havent Created a todo</h1>
      )}
    </div>
  );
};

export default UserTodos;