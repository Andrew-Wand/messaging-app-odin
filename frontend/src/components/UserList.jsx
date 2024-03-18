import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { Link } from "react-router-dom";

const UserList = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [allUserList, setAllUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const userList = await UserService.getUserList();
        setAllUserList(userList.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserList();
  }, []);

  const filteredUserList = allUserList.filter(
    (user) => user.email !== currentUser.email
  );

  const onChangeSelect = (e) => {
    const selection = e.target.value;
    console.log(e.target.value);
    setSelectedUser(selection);
  };

  // console.log(filteredUserList);
  return (
    <div>
      {currentUser ? (
        <div>
          <p>Friends list</p>

          <select size={4} name="" id="" onChange={onChangeSelect}>
            {filteredUserList.map((user) => (
              <option value={user.id} key={user.id}>
                {user.username}
              </option>
            ))}
          </select>
          {/* <ul>
            {filteredUserList.map((user, i) => (
              <li key={i}>{user.username}</li>
            ))}
          </ul> */}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserList;
