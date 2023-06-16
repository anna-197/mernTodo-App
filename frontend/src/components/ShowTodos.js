import { useState, useEffect } from "react";
import axios from "axios";
import { UpdateTodos } from "./UpdateTodos";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import Login from "../pages/Login";

function TodoCard({ data, handleEdit, handleDelete }) {
  // updated
  const { _id, title, description } = data;
  

  return (
    
    <li key={_id}>
      <div className="title-description">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>

      <div className="button-container">
        <button className="button" name={_id} onClick={handleEdit}>
          edit
        </button>
        <button className="button" name={_id} onClick={handleDelete}>
          delete
        </button>
      </div>
    </li>
  );
}

export function ShowTodos() {
  const [todo, setTodo] = useState([]);
  const [open, setOpen] = useState(false); // added
  const [id, setId] = useState(""); // added
  const [update, setUpdate] = useState(false); // added
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const [value, setValue] = useState();

  useEffect(
    function () {
      axios
        .get("http://localhost:8080/api/todo/get-all-todos")
        .then((res) => {
          console.log(res.data);
          setTodo(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    },
    [update]
  );

  function handleEdit(e) {
    setId(e.target.name);
    setOpen(true);
  }

  function handleUpdate() {
    console.log("update:", update, !update);
    setUpdate(!update);
  }

  function handleDelete(e) {
    axios.delete(`http://localhost:8080/api/todo/delete-todo/${e.target.name}`);

    setTodo((data) => {
      return data.filter((todo) => todo._id !== e.target.name);
    });
  }

  function handleClose() {
    // added
    setId("");
    setOpen(false);
  }

  return (
    <section className="container">
      <section className="contents">
        
        
        {isLogin && (
            <>
            <h1>TODOS</h1>
            <ul className="list-container">
            {todo.map((data) => (
            <TodoCard
              data={data}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
            ))}
             </ul>
             </>
         
        )}

        {!isLogin && (
            <>
            <div className='hp-gif' styles="width:100%;height:60%;padding-bottom:80%;position:relative;"><iframe src="https://giphy.com/embed/BferOKonYOspm28AiB" width="100%" height="100%" styles="position:absolute" frameBorder="0"  allowFullScreen></iframe></div><p><a href="https://giphy.com/gifs/computer-working-all-nighter-BferOKonYOspm28AiB"></a></p>
            </>
        )}
          
       
      </section>
      {open ? (
        <section className="update-container">
          <div className="update-contents">
            <p onClick={handleClose} className="close">
              &times;
            </p>

            <UpdateTodos
              _id={id}
              handleClose={handleClose}
              handleUpdate={handleUpdate}
            />
          </div>
        </section>
      ) : (
        ""
      )}
    </section>
  );
}
