import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";
import Message from "./pages/Message";

function App() {
  // const [items, setItems] = useState([]);

  // const getData = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:3000/api/items");
  //     console.log(response.data);
  //     setItems(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  // function renderItems() {
  //   return items.map((item, i) => {
  //     return (
  //       <div key={i}>
  //         <h3>{item.name}</h3>
  //         <p>Price: {item.price}</p>
  //       </div>
  //     );
  //   });
  // }

  const [messageId, setMessageId] = useState("");
  const messageURL = "/message/" + messageId;

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home setMessageId={setMessageId} />} />
        <Route path="/home" element={<Home setMessageId={setMessageId} />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path={messageURL} element={<Message />} />
      </Routes>
    </div>
  );
}

export default App;
