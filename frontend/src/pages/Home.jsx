import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import UserList from "../components/UserList";
import { Link } from "react-router-dom";

const Home = ({ setMessageId }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getPublicContent().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response && error.response.data) ||
          error.message ||
          error.toString();

        setContent(_content);
      }
    );
  }, []);

  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <div className="container h-screen">
      {/* <header className="jumbotron">
        <h3>{content}</h3>
      </header> */}

      <div>
        {currentUser ? (
          // HOME PAGE if user is logged in
          <div>
            <UserList setMessageId={setMessageId} />
          </div>
        ) : (
          // HOME PAGE if user is logged out
          <div>
            <h1>Welcome!</h1>
            <div>
              <ul>
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
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
