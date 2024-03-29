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
    <div className="container xl:min-w-full h-screen bg-slate-400 flex justify-center items-center">
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
          <div className="card w-96 bg-base-100 shadow-xl h-[25rem]">
            <header className="mt-20">
              <h1 className="card-title justify-center text-2xl">
                Welcome to Chat Room!
              </h1>
            </header>

            <div className="card-body items-center justify-center text-center">
              <div className="card-actions">
                <div>
                  <ul>
                    <li className="">
                      <Link to={"/sign-in"} className="btn btn-wide btn-info">
                        Login
                      </Link>
                    </li>
                    <div className="divider">or</div>
                    <li className="">
                      <Link
                        to={"/register"}
                        className="btn btn-wide btn-neutral"
                      >
                        Sign Up
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          // <div >

          //   <h1>Welcome!</h1>
          // <div>
          //   <ul>
          //     <li className="nav-item">
          //       <Link to={"/sign-in"} className="nav-link">
          //         Login
          //       </Link>
          //     </li>

          //     <li className="nav-item">
          //       <Link to={"/register"} className="nav-link">
          //         Sign Up
          //       </Link>
          //     </li>
          //   </ul>
          // </div>
          // </div>
        )}
      </div>
    </div>
  );
};

export default Home;
