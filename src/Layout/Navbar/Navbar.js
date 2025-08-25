import { NavLink, Outlet } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import "../Navbar/header.scss";
import { useNavigate } from "react-router-dom";
import ActionApproval from "../../Containers/Authentication/ActionApproval";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Sidebar from "./Sidebar";
import DeleteModel from "../../components/confirmModel/DeleteModel";
import Button from "../../components/Form/button/Button";

const Navbar = ({ logoutAction, LogoutResponse }) => {
  const navigate = useNavigate();
  const [isSticky, setIsSticky] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const hasNavigatedRef = useRef(false);

  const handleLogoutConfirm = () => {
    setIsLogout(true);
    logoutAction();
    setShowConfirm(false); // close modal
  };

  const handleLogoutCancel = () => {
    setShowConfirm(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev); 
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigate after logout response is received
  useEffect(() => {
    if (isLogout && typeof LogoutResponse !== "undefined" && !hasNavigatedRef.current) {
      hasNavigatedRef.current = true;
      navigate("/", { replace: true });
    }
  }, [LogoutResponse, navigate, isLogout]);

  return (
    <div>
      <div className={isSticky ? "header-sticky" : "main_header"}>
        <div className="main_container">
          <div className="logo">
            <h1>VILLA</h1>
          </div>

          <div className="navbar">
            <ul className="nav">
              <li>
                <NavLink to="/container/home" className={({ isActive }) => (isActive ? "active" : "")}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/container/activity" className={({ isActive }) => (isActive ? "active" : "")}>
                  Activities
                </NavLink>
              </li>
              <li>
                <NavLink to="/container/author" className={({ isActive }) => (isActive ? "active" : "")}>
                  Authors
                </NavLink>
              </li>
              <li>
                <NavLink to="/container/books" className={({ isActive }) => (isActive ? "active" : "")}>
                  Books
                </NavLink>
              </li>
              <li>
                <NavLink to="/container/users" className={({ isActive }) => (isActive ? "active" : "")}>
                  Users
                </NavLink>
              </li>
              <li>
                <NavLink to="/container/authusers" className={({ isActive }) => (isActive ? "active" : "")}>
                  AuthUsers
                </NavLink>
              </li>
              <li>
                <Button
                  type="button"
                  className="logout-link"
                  onClick={() => setShowConfirm(true)}>
                  Log Out
                </Button>
              </li>
            </ul>

            {/* Hamburger icon - visible on mobile */}
            <button className="navbar-toggle" onClick={toggleSidebar}>
              <FontAwesomeIcon icon="bars" />
            </button>
          </div>
        </div>
      </div>

      {/* Sidebar */}
      {isSidebarOpen && <Sidebar toggleSidebar={toggleSidebar} handleLogout={() => setShowConfirm(true)} />}

      {/* Logout confirmation modal */}
      <DeleteModel
        isOpen={showConfirm}
        message="Are you sure you want to log out?"
        onConfirm={handleLogoutConfirm}
        onCancel={handleLogoutCancel}
        loading={isLogout}
        confirmText="Log Out"
        cancelText="Cancel"
      />

      <Outlet />
    </div>
  );
};

export default ActionApproval(Navbar);
