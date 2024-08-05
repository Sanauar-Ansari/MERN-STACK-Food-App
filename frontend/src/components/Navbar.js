import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Badge } from "react-bootstrap";
import Cart from "../main_page/Cart";
import Modal from "../Modal";
import { useCart } from "./ContextReducer";

const Navbar = () => {
  const data = useCart();
  const [cartView, setCartView] = useState(false);
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };
  return (
    <div className="header">
      <nav className="navbar navbar-expand-lg navbar-light  ">
        <div className="container-fluid">
          <Link className="navbar-brand fs-1  fst-italic" to="/">
            FoodMenia
          </Link>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  className="nav-link active fs-5"
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>
            </ul>
            <div className="d-flex">
              {localStorage.getItem("authToken") ? (
                <div>
                  <div
                    className="btn bg-white text-success mx-1"
                    onClick={() => {
                      setCartView(true);
                    }}
                  >
                    My Cart {"  "}
                    <Badge pill bg="danger">
                      {data.length}
                    </Badge>
                  </div>

                  {cartView ? (
                    <Modal onClose={() => setCartView(false)}>
                      <Cart></Cart>
                    </Modal>
                  ) : null}
                  <div
                    className="btn bg-white text-danger mx-1"
                    onClick={handleLogOut}
                  >
                    LogOut
                  </div>
                </div>
              ) : (
                <>
                  <Link className="btn bg-white text-success mx-1" to="/login">
                    Login
                  </Link>

                  <Link
                    className="btn bg-white text-success mx-1"
                    to="/createuser"
                  >
                    SignUp
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
