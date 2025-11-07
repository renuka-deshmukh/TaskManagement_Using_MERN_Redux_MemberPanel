import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../Redux/auth/authSlice";
import "./Navbar.css"; 

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleLogout() {
    dispatch(logout());
    navigate("/");
  }

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm px-3">
      <Link className="navbar-brand fw-bold text-light fs-4" to="/dashboard">
        <i className="bi bi-kanban me-2"></i>Task<span className="text-accent">Manager</span>
      </Link>

      <button
        className="navbar-toggler text-white"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
        {/* Left Links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link active" to="/dashboard">
              <i className="bi bi-house-door me-1"></i>Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/tasks">
              <i className="bi bi-list-task me-1"></i>Tasks
            </Link>
          </li>
        </ul>

        {/* Right Section */}
        <div className="d-flex align-items-center gap-3">
          {user ? (
            <>
              <span className="user-badge text-light px-3 py-1 rounded-pill">
                <i className="bi bi-person-circle me-1"></i>{user.name}
              </span>
              <button onClick={handleLogout} className="btn btn-outline-light btn-sm rounded-pill px-3">
                <i className="bi bi-box-arrow-right me-1"></i>Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/register" className="btn btn-light btn-sm rounded-pill px-3">
                Register
              </Link>
              <Link to="/" className="btn btn-outline-light btn-sm rounded-pill px-3">
                Login
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
