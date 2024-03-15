import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { Link } from "react-router-dom";

const UserList = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [allUserList, setAllUserList] = useState([]);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    const fetchUserList = async () => {
      const userList = await UserService.getUserList();
      setAllUserList(userList.data);
    };
    fetchUserList();
  }, []);

  const filteredUserList = allUserList.filter(
    (user) => user.email !== currentUser.email
  );

  console.log(filteredUserList);
  return (
    <div>
      {currentUser ? (
        <div>
          <p>Friends list</p>
          <ul>
            {filteredUserList.map((user, i) => (
              <li key={i}>{user.username}</li>
            ))}
          </ul>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserList;
