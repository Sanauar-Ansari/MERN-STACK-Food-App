import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        password: data.password,
      }),
    });

    const json = await response.json();
    navigate("/login");

    if (!json.success) {
      alert("Enter valid details ");
    }
  };

  const onChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  return (
    <div className="container bg-secondary">
      <div className="main_heading">
        <h1>SignUp Page for new user</h1>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            UserName
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={data.name}
            onChange={onChange}
          />
        </div>

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
          Submit
        </button>

        <Link to="/login" className="m-3 btn btn-danger">
          Already have account
        </Link>
      </form>
    </div>
  );
};

export default Signup;
