import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Authentication/Login";
import Signup from "./Authentication/Signup";
import HomeLayout from "./Component/Layout/HomeLayout";
import ProfileLayout from "./Component/Layout/ProfileLayout";
import ConnectionLayout from "./Component/Layout/ConnectionLayout";
import Protected from "./ProtectedRoute/Protected";


import ContextApi from "./ContextApi/ContextApi";

function App() {

  return (
    <BrowserRouter>
     <ContextApi>
      <div className="App">
        <Routes>
          <Route path="/" element={<Protected Component={Login} path={"home"} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Protected Component={HomeLayout} path={"home"} />} />
          <Route path="/profile" element={<Protected Component={ProfileLayout} path={"profile"} />} />
          <Route path="/connections" element={<Protected Component={ConnectionLayout} path={"connections"} />} />
        </Routes>
      </div>
      </ContextApi>
    </BrowserRouter>
  );
}

export default App;
