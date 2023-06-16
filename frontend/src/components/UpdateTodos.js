import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function UpdateTodos({ _id, handleClose, handleEdited }) {
    const [data, setData] = useState({ title: "", description: "" });
    const navigate = useNavigate();

    function handleChange(e) {
        setData((data) => ({ ...data, [e.target.name]: e.target.value }));
    }

    function handleSubmit(e) {
        e.preventDefault();
        navigate("/");

        console.log({ _id }, { data });

        axios
            .put(`http://localhost:8080/api/todo/update-todo/${_id}`, data)
            .then((res) => {
                setData({ title: "", description: "" });
                console.log(res.data.message);
                
                
            })
            .catch((err) => {
                console.log("Failed to update todo");
                console.log(err.message);
            });

            navigate("/");
            
    }

    return (
        <form
            className="form-container"
            onSubmit={(e) => {
                handleSubmit(e);
                handleClose();
            }}
        >
            <label htmlFor="title" className="label">
                Title
            </label>
            <input
                type="text"
                name="title"
                className="input"
                onChange={handleChange}
            />
            <label htmlFor="description" className="label">
                Description
            </label>
            <input
                type="text"
                name="description"
                className="input"
                onChange={handleChange}
            />
            <button type="submit" className="button" >
                Submit
            </button>
        </form>
    );
}