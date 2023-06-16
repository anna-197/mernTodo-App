import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import Login from "../pages/Login";
import UserTodos from "../pages/UserTodos";

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
    <>
    {!isLogin && (
        <>
        <Link to="/login" element = {<Login/>}>
    <button>Login</button>
    </Link>

    
        </>
    )}
    
   {isLogin && (
    <>
    <button onClick={handleLogout}>Logout</button>
    <Link to="/get-user-todos/:id" element = {<UserTodos/>}>
    <button>Get My Todos</button>
    </Link>
    </>

   )}
       
    </>
  )
}

export default Header;