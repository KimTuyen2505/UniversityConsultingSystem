import { useState } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "./components/header";
import Footer from "./components/footer";
import Test from "./components/test";
import Home from "./Page/Home";
import Login from "./Page/Login";
import Register from "./Page/Register";
import Forum from "./Page/Forum";
import ForumOfMajors from "./Page/ForumOfMajors";
import DetailPost from "./Page/DetailPost";

function App() {
  const [user, setUser] = useState(
    localStorage.getItem("dataUser")
      ? JSON.parse(localStorage.getItem("dataUser"))
      : null
  );
  return (
    <div className="overflow-x-hidden antialiased">
      <Header user={user} setUser={setUser} />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/test" element={<Test />}></Route>
        <Route
          path="/login"
          element={<Login user={user} setUser={setUser} />}
        ></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/forum" element={<Forum />}></Route>
        <Route path="/forum/:idForum" element={<ForumOfMajors />}></Route>
        <Route path="/forum/:idForum/:idDetailForum" element={<DetailPost />}></Route>
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
