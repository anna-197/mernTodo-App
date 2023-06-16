import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import Login from "../pages/Login";
import { ShowTodos } from "./ShowTodos";

const Header = () => {
  // global state
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //state
  const [value, setValue] = useState();

  //logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      alert("Logout Successfully");
      navigate("/login");
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="header">
    <Link to="/" element={<ShowTodos />}>
    <div className="header-logo"><img src="https://cdn.icon-icons.com/icons2/1859/PNG/512/checklist_117966.png"></img></div>
    </Link>
    <div className="header-title">Taskify</div>
      {!isLogin && (
        <>
          <Link to="/login" element={<Login />}>
            <button className="btn">Sign Up / Sign In</button>
          </Link>
        </>
      )}

      {isLogin && (
        <>
        <Link to="/create-todo" className="button-new">
                <button className="new-btn">Create Todo</button>
            </Link>
          <button className="btn" onClick={handleLogout}>Logout</button>
         
        </>
      )}
    </div>
  );
};

export default Header;
