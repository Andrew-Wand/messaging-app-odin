import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8081/api/test/";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};

const getUserList = () => {
  return axios.get(API_URL + "allUserList");
};

const getMessageList = () => {
  return axios.get(API_URL + "allMessageList");
};
const postSendMessage = (text, owner, receiver) => {
  return axios.post(API_URL + "sendmessage", {
    text,
    owner,
    receiver,
  });
};

const UserService = {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
  getUserList,
  getMessageList,
  postSendMessage,
};

export default UserService;
