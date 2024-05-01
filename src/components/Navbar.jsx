import { Button } from "bootstrap";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../images/cart.png"
import Modal from "../../Modal";
import Cart from '../Screens/Cart'
import Badge from 'react-bootstrap/Badge';
import { useCartState } from "./ContextReducer";

export default function () {
  let data = useCartState()
  const [ViewC, setViewC] = useState(false)
  const navigate = useNavigate();
  const handleclick = () => {
    localStorage.removeItem("authToken")
    navigate("/")
  }

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link
          className="navbar-brand fs-3 fst-italic bg-danger bg-gradient 
 rounded info mx-2 p-2"
          to="/"

        >
          FooDy~zone
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="navbar-collapse collapse " id="navbarNavDropdown">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item ">
              <Link className="nav-link  " to="/">
                Home
              </Link>
            </li>
            <li>
              {localStorage.getItem("authToken") ? (
                <li  >
                  <Link className="nav-link " to="/myorders">My Orders</Link>
                </li>
              ) : (
                ""
              )}
            </li>
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link className="btn btn-primary mx-1" to="/login">
                Login
              </Link>

              <Link className="btn btn-primary mx-1" to="/signup">
                SignUp
              </Link>
            </div>
          ) : (
            <div className="d-flex">

              <button className="btn btn-warning d-flex" style={{ backgroundImage: `url(${logo})` }} onClick={() => setViewC(true)}  >

                Cart {" "}
                {data?.length != 0 ? <Badge > {data?.length} </Badge> : null}
              </button>

              {ViewC ?
                <Modal onClose={() => setViewC(false)}>
                  <Cart />
                </Modal> : ""}
              <button className="btn btn-primary text-danger mx-1" to="/signup" onClick={handleclick} >
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
