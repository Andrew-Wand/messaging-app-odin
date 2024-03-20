import { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const currentUser = AuthService.getCurrentUser();

  // console.log(currentUser);

  const onChangeEmailValue = (e) => {
    const email = e.target.value;
    setNewEmail(email);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    let existingUser = currentUser;
    const newUpdatedUser = {
      ...existingUser,
      email: newEmail,
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
    <div>
      <div>
        {isEditing ? (
          <form onSubmit={handleEditSubmit}>
            <p>
              <strong>Old Email:</strong> {currentUser.email}
            </p>
            <label htmlFor="">New Email:</label>
            <input type="text" value={newEmail} onChange={onChangeEmailValue} />
            <button>Submit</button>

            <button onClick={() => setIsEditing(false)}>Cancel</button>
          </form>
        ) : (
          // Profile page display without edit
          <div>
            <header>
              <h3>{currentUser.username} Profile</h3>
            </header>

            <p>
              <strong>Email:</strong> {currentUser.email}
            </p>

            <button className="btn" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
