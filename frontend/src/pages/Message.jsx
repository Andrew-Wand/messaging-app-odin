import { useEffect, useState } from "react";
import UserService from "../services/user.service";

const Message = () => {
  const queryString = window.location.pathname;
  const userId = queryString.slice(-1);
  const [userSelected, setUserSelected] = useState([]);

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

  const filteredUserList = userSelected.filter((user) => user.id == userId);
  return (
    <div>
      <header>
        {filteredUserList.map((user, i) => (
          <h1 key={i}>Message {user.username}</h1>
        ))}
      </header>

      <div>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>

      <button>Send</button>
    </div>
  );
};

export default Message;
