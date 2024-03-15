import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import AuthService from "./services/auth.service";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import SignIn from "./pages/SignIn";
import Navbar from "./components/Navbar";

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

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
