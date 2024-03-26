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
  const [drawerVisible, setDrawerVisibile] = useState(false);

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
    setSelectedUser(selection);
    setBtnVisible(true);
    setMessageId(selection);
    setDrawerVisibile(false);
  };

  const messageURL = "/message/" + selectedUser;

  return (
    <div>
      {currentUser ? (
        <div>
          <div>
            <div className="drawer xl:hidden">
              <h1 className="text-xl mt-5 ml-5">
                Welcome back {currentUser.username}!
              </h1>
              {drawerVisible ? (
                <input
                  id="my-drawer"
                  type="checkbox"
                  className="drawer-toggle"
                  checked
                />
              ) : (
                <input
                  id="my-drawer"
                  type="checkbox"
                  className="drawer-toggle"
                />
              )}

              <div className="drawer-content flex justify-end mr-2">
                {/* Page content here */}

                <label
                  htmlFor="my-drawer"
                  className="btn btn-primary drawer-button mb-2 mt-5"
                  onClick={() => {
                    drawerVisible
                      ? setDrawerVisibile(false)
                      : setDrawerVisibile(true);
                  }}
                >
                  Friends List
                </label>
              </div>
              <div className="drawer-side">
                <label
                  htmlFor="my-drawer"
                  aria-label="close sidebar"
                  className="drawer-overlay"
                ></label>

                <div className="bg-slate-500 h-[3rem] w-full text-center">
                  <h3 className="text-2xl mt-1">Friends List</h3>
                </div>
                <select
                  className="xl:block p-4 w-full min-h-full bg-base-100 text-base-content p-0 mt-10 "
                  size={10}
                  name=""
                  id=""
                  onChange={onChangeSelect}
                >
                  {filteredUserList.map((user) => (
                    <>
                      <option
                        className="text-2xl border-solid border-b-[1px] border-slate-500 bg-white text-black h-[5rem]"
                        value={user.id}
                        key={user.id}
                      >
                        <div className="avatar placeholder">
                          <div className="bg-neutral text-neutral-content rounded-full w-16 mr-10 mt-2">
                            <span className="text-xl">
                              {user.username.slice(0, 1)}
                            </span>
                          </div>
                        </div>
                        {user.username}
                      </option>
                    </>
                  ))}
                </select>
              </div>
            </div>
          </div>
          {/* Chat Area / Friends list DESKTOP */}
          <div className="flex justify-end mr-10">
            <select
              className="hidden xl:block p-4 xl:w-60 min-h-full bg-base-300 text-base-content p-0 mt-10"
              size={4}
              name=""
              id=""
              onChange={onChangeSelect}
            >
              {filteredUserList.map((user) => (
                <option
                  value={user.id}
                  key={user.id}
                  className="text-2xl border-solid border-b-[1px] border-slate-500 bg-white text-black h-[5rem]"
                >
                  {user.username}
                </option>
              ))}
            </select>
            <div className="w-[25rem] h-[26rem] xl:w-[46rem] xl:h-[25rem] xl:mt-10 artboard artboard-horizontal bg-black rounded-xl overflow-auto flex flex-col-reverse">
              <ul>
                {filteredMessageList.map((message, i) => (
                  <div key={i}>
                    {message.receiver !== selectedUser ? (
                      <div className="chat chat-start">
                        <div className="chat-bubble chat-bubble-error static">
                          {message.text}
                        </div>
                      </div>
                    ) : (
                      <div className="chat chat-end">
                        <div className="chat-header">
                          {currentUser.username}
                        </div>
                        <div className="chat-bubble chat-bubble-info static">
                          {message.text}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </ul>
            </div>
          </div>

          {btnvisible ? (
            <div className="xl:flex xl:mr-10 xl:mt-10 xl:justify-end mt-10 ml-5">
              <Link className="btn btn-secondary" to={messageURL}>
                Send message
              </Link>
            </div>
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
