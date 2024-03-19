import { useEffect, useState } from "react";
import UserService from "../services/user.service";
import AuthService from "../services/auth.service";

const Message = () => {
  const queryString = window.location.pathname;
  const userId = queryString.slice(-1);
  const [userSelected, setUserSelected] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const currentUser = AuthService.getCurrentUser();
  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const userList = await UserService.getUserList();
        setUserSelected(userList.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUserList();
  }, []);

  const messageTextOnChange = (e) => {
    const message = e.target.value;
    setMessageText(message);
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    let owner = currentUser.id;

    UserService.postSendMessage(messageText, owner, receiverId.toString()).then(
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
  };

  const filteredUserList = userSelected.filter((user) => user.id == userId);
  const receiverId = filteredUserList.map((user) => {
    return user.id.toString();
  });

  return (
    <div>
      <header>
        {filteredUserList.map((user, i) => (
          <h1 key={i}>Message {user.username}</h1>
        ))}
      </header>

      <form onSubmit={handleSendMessage}>
        <div>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={messageTextOnChange}
          ></textarea>
        </div>
        <button>Send</button>
      </form>
    </div>
  );
};

export default Message;
