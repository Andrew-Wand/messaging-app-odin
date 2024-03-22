import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };
  return (
    <div>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {currentUser ? (
                // User is logged in
                <div className="navbar-nav ">
                  <li className="nav-item">
                    <Link
                      to={`/profile/${currentUser.id}`}
                      className="nav-link"
                    >
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item">
                    <a href="/" className="nav-link" onClick={logOut}>
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                // No user logged in
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link to={"/sign-in"} className="nav-link">
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link to={"/register"} className="nav-link">
                      Sign Up
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
          <Link to="/" className="btn btn-ghost text-xl">
            Chat Room
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
            <li>
              <details>
                <summary>Parent</summary>
                <ul className="p-2">
                  <li>
                    <a>Submenu 1</a>
                  </li>
                  <li>
                    <a>Submenu 2</a>
                  </li>
                </ul>
              </details>
            </li>
            <li>
              <a>Item 3</a>
            </li>
          </ul>
        </div>
        {/* <div className="navbar-end">
          <a className="btn">Button</a>
        </div> */}
      </div>
      {/* <Link to={"/"}>Home</Link> */}

      {/* {currentUser ? (
        // User is logged in
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={`/profile/${currentUser.id}`} className="nav-link">
              {currentUser.username}
            </Link>
          </li>
          <li className="nav-item">
            <a href="/" className="nav-link" onClick={logOut}>
              LogOut
            </a>
          </li>
        </div>
      ) : (
        // No user logged in
        <div className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link to={"/sign-in"} className="nav-link">
              Login
            </Link>
          </li>

          <li className="nav-item">
            <Link to={"/register"} className="nav-link">
              Sign Up
            </Link>
          </li>
        </div>
      )} */}
    </div>
  );
};

export default Navbar;
