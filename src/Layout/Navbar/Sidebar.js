import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../components/Form/button/Button";

const Sidebar = ({ toggleSidebar, handleLogout }) => {
  return (
    <div className="sidebar-container">
      <div className="sidebar-backdrop" onClick={toggleSidebar}></div>
      <div className="sidebar-menu">
        <button className="close-sidebar-button" onClick={toggleSidebar}>
          <FontAwesomeIcon icon="times" />
        </button>

        <ul className="side-nav">
          <li>
            <NavLink to="/container/home" onClick={toggleSidebar}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/container/activity" onClick={toggleSidebar}>
              Activities
            </NavLink>
          </li>
          <li>
            <NavLink to="/container/author" onClick={toggleSidebar}>
              Authors
            </NavLink>
          </li>
          <li>
            <NavLink to="/container/books" onClick={toggleSidebar}>
              Books
            </NavLink>
          </li>
          <li>
            <NavLink to="/container/users" onClick={toggleSidebar}>
              Users
            </NavLink>
          </li>
          <li>
             <Button
              type="button"
              className="logout-link"
              onClick={() => {
                handleLogout(); // just opens modal
                toggleSidebar(); // close sidebar after click
              }}>
              Log Out
            </Button>
          </li>
          <li>
            <NavLink className="nav_link" to="/container/contact" onClick={toggleSidebar}>
              <i>
                <FontAwesomeIcon icon="phone" />
              </i>
              Schedule Visit
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
