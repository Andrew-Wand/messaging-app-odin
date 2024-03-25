import { useState, useEffect } from "react";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";
import { Link } from "react-router-dom";

const UserList = ({ setMessageId }) => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [allMessageList, setAllMessageList] = useState([]);
  const [allUserList, setAllUserList] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [btnvisible, setBtnVisible] = useState(false);

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

  // Fetch all messages from DB
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const messageList = await UserService.getMessageList();
        setAllMessageList(messageList.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMessages();
  }, []);

  const filteredMessageList = allMessageList.filter(
    (message) =>
      selectedUser === message.owner ||
      selectedUser === message.receiver ||
      currentUser.id === message.receiver ||
      currentUser.id === message.owner
  );

  const filteredUserList = allUserList.filter(
    (user) => user.username !== currentUser.username
  );

  const onChangeSelect = (e) => {
    const selection = e.target.value;
    // console.log(e.target.value);
    setSelectedUser(selection);
    setBtnVisible(true);
    setMessageId(selection);
  };

  const messageURL = "/message/" + selectedUser;

  // console.log(filteredUserList);
  return (
    <div>
      {currentUser ? (
        <div>
          <div>
            <p>Friends list</p>

            <select size={4} name="" id="" onChange={onChangeSelect}>
              {filteredUserList.map((user) => (
                <option value={user.id} key={user.id}>
                  {user.username}
                </option>
              ))}
            </select>
          </div>
          {/* Chat Area */}
          <div className=" w-[22rem] xl:artboard artboard-horizontal phone-1 bg-black rounded-xl ml-8 ">
            <ul>
              {filteredMessageList.map((message, i) => (
                <div key={i}>
                  {message.receiver !== selectedUser ? (
                    <div className="chat chat-start">
                      <div className="chat-bubble">{message.text}</div>
                    </div>
                  ) : (
                    <div className="chat chat-end">
                      <div className="chat-header">{currentUser.username}</div>
                      <div className="chat-bubble">{message.text}</div>
                    </div>
                  )}
                </div>
                // <li
                //   key={i}
                //   style={
                //     message.receiver !== selectedUser
                //       ? { fontWeight: "bold" }
                //       : { fontWeight: "normal" }
                //   }
                // >
                //   {message.text}
                // </li>
              ))}
            </ul>
          </div>

          {/* <ul>
            {filteredUserList.map((user, i) => (
              <li key={i}>{user.username}</li>
            ))}
          </ul> */}
          {btnvisible ? (
            <Link className="btn btn-secondary m-6" to={messageURL}>
              Send message
            </Link>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default UserList;
