import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: data.email,
        password: data.password,
      }),
    });

    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid details ");
    }
    if (json.success) {
      localStorage.setItem("userEmail", data.email);
      localStorage.setItem("authToken", json.authToken);
      console.log(localStorage.getItem("authToken"));
      navigate("/");
    }
  };

  const onChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  return (
    <>
      <div className="container bg-info">
        <div className="main_heading">
          <h1>Welcome back in FoodMenia </h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              name="email"
              value={data.email}
              onChange={onChange}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              name="password"
              value={data.password}
              onChange={onChange}
            />
          </div>

          <button type="submit" className="m-3 btn btn-primary">
            SignIn
          </button>

          <Link to="/createuser" className="m-3 btn btn-danger">
            Don't have account SignUp
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
