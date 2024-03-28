import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const currentUser = AuthService.getCurrentUser();

  // console.log(currentUser);

  const onChangeEmailValue = (e) => {
    const email = e.target.value;
    setNewEmail(email);
  };
  const onChangeFirstNameValue = (e) => {
    const firstName = e.target.value;
    setNewFirstName(firstName);
  };
  const onChangeLastNameValue = (e) => {
    const lastName = e.target.value;
    setNewLastName(lastName);
  };
  const onChangeUsernameValue = (e) => {
    const username = e.target.value;
    setNewUsername(username);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    let existingUser = currentUser;
    const newUpdatedUser = {
      ...existingUser,
      email: newEmail,
      first_name: newFirstName,
      last_name: newLastName,
      username: newUsername,
    };

    localStorage.setItem("user", JSON.stringify(newUpdatedUser));

    UserService.editProfile(newEmail).then(
      (response) => {
        setMessage(response.data.message);
        setSuccessful(true);
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setMessage(resMessage);
        setSuccessful(false);
      }
    );

    setIsEditing(false);

    // window.location.reload();
  };

  return (
    <div className="min-h-screen flex justify-center items-starts">
      <div className="">
        <header>
          <h3 className="text-4xl text-center my-10">Profile</h3>
        </header>
        <div className="divider"></div>
        {isEditing ? (
          <div className="bg-slate-400 p-7 shadow-xl">
            <div className="flex-column">
              <h2 className="text-2xl text-center mb-5">Edit Profile</h2>
              <form onSubmit={handleEditSubmit}>
                {/* <p>
                <strong>Old Email:</strong> {currentUser.email}
              </p> */}
                <div className="mb-5">
                  <label
                    className="input input-bordered flex items-center gap-2 shadow-lg"
                    htmlFor=""
                  >
                    <span className="btn bg-slate-400/50 border-none ml-[-1rem]">
                      Email:
                    </span>
                    <input
                      type="text"
                      defaultValue={currentUser.email}
                      onChange={onChangeEmailValue}
                      className="grow "
                    />
                  </label>
                </div>

                <div className="mb-5">
                  <label
                    className="input input-bordered flex items-center gap-2 shadow-lg"
                    htmlFor=""
                  >
                    <span className="btn bg-slate-400/50 border-none ml-[-1rem]">
                      First Name:
                    </span>
                    <input
                      type="text"
                      defaultValue={currentUser.first_name}
                      onChange={onChangeFirstNameValue}
                      className="grow"
                    />
                  </label>
                </div>

                <div className="mb-5">
                  <label
                    className="input input-bordered flex items-center gap-2 shadow-lg"
                    htmlFor=""
                  >
                    <span className="btn bg-slate-400/50 border-none ml-[-1rem]">
                      Last Name:
                    </span>
                    <input
                      type="text"
                      defaultValue={currentUser.last_name}
                      onChange={onChangeLastNameValue}
                      className="grow"
                    />
                  </label>
                </div>

                <div>
                  <label
                    className="input input-bordered flex items-center gap-2 shadow-lg"
                    htmlFor=""
                  >
                    <span className="btn bg-slate-400/50 border-none ml-[-1rem]">
                      Username:
                    </span>
                    <input
                      type="text"
                      defaultValue={currentUser.username}
                      onChange={onChangeUsernameValue}
                      className="grow"
                    />
                  </label>
                </div>

                <div className="mt-5">
                  <button className="btn btn-success mr-5">Submit</button>

                  <button
                    className="btn btn-warning"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          // Profile page display without edit

          <div className="bg-slate-400 p-10 shadow-lg">
            <div className="justify-evenly flex">
              <Link to="/" className="btn btn-info">
                Back
              </Link>
              <button
                className="btn btn-accent shadow-lg mb-10"
                onClick={() => setIsEditing(true)}
              >
                Edit
              </button>
            </div>
            <div>
              <p className="mb-5">
                <strong>Email:</strong> {currentUser.email}
              </p>
              <p className="mb-5">
                <strong>First Name:</strong> {currentUser.first_name}
              </p>
              <p className="mb-5">
                <strong>Last Name:</strong> {currentUser.last_name}
              </p>
              <p className="mb-5">
                <strong>Username:</strong> {currentUser.username}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
