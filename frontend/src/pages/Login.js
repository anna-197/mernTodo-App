import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //state
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  //handle input change
  const handleLoginChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form handle
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/api/user/login", {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userId", data?.user._id);
        dispatch(authActions.login());
        alert("User login Successfully");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  //REGISTER

  //handle input change
  const handleRegisterChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //form handle
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("http://localhost:8080/api/user/register", {
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        alert("User Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div class="main">  	
		<input type="checkbox" id="chk" aria-hidden="true" />

			<div class="signup">
				<form onSubmit={handleRegisterSubmit}>
					<label for="chk" aria-hidden="true">Sign up</label>
					<input  placeholder="name"
            value={inputs.name}
            onChange={handleRegisterChange}
            name="name"
            margin="normal"
            type={"text"}
            required />
					<input placeholder="email"
            value={inputs.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleRegisterChange} />
					<input  placeholder="password"
            value={inputs.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={handleRegisterChange} />
					<button>Sign up</button>
				</form>
			</div>

			<div class="login">
				<form onSubmit={handleLoginSubmit}>
					<label for="chk" aria-hidden="true">Login</label>
					<input placeholder="email"
            value={inputs.email}
            name="email"
            margin="normal"
            type={"email"}
            required
            onChange={handleLoginChange} />
					<input placeholder="password"
            value={inputs.password}
            name="password"
            margin="normal"
            type={"password"}
            required
            onChange={handleLoginChange}/>
					<button>Login</button>
				</form>
			</div>
	</div>
  );
};

export default Login;
