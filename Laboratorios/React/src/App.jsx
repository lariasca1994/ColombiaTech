import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Example from "./components/example";
import Footer from "./components/footer";
import Header from "./components/header";
import UserList from "./components/user/UserList";
import HouseList from "./components/house/HouseList";
import Login from "./components/auth/Login";
import UserFormCreate from "./components/user/UserFormCreate";
import UserFormEdit from "./components/user/UserFormEdit";
import { useDispatch } from 'react-redux'
import { useEffect } from "react";
import { loginSuccess } from "./features/authSlice";
import PrivateRoute from "./components/PrivateRoute";
import ChangePassword from "./components/auth/ChangePassword";
import HouseFormCreate from "./components/house/HouseFormCreate";
import HouseFormEdit from "./components/house/HouseFormEdit";
import Home from "./components/Home"
import Chat from "./components/chat/Chat";

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const sessionData = localStorage.getItem('sessionData');
    if(sessionData) {
      dispatch(loginSuccess(JSON.parse(sessionData)))      
    }
  })

  return (
    <>      
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Rutas Privadas */}
          <Route path="/" element={<PrivateRoute Component={Home} />} />
          <Route path="/user" element={<PrivateRoute Component={UserList} />} />
          <Route path="/house" element={<PrivateRoute Component={HouseList} />} />
          <Route path="/house/:id" element={<PrivateRoute Component={HouseFormEdit} />} />
          <Route path="/user/:id" element={<PrivateRoute Component={UserFormEdit} />} />
          <Route path="/change-password" element={<PrivateRoute Component={ChangePassword} />} />
          
          {/* Rutas de Chat */}
          <Route path="/chat" element={<PrivateRoute Component={Chat} />} />

          {/* Rutas de casas */}
          <Route path="/create-house" element={<PrivateRoute Component={HouseFormCreate} />} />

          {/* Rutas de Chat */}
          <Route path="/chat" element={<PrivateRoute Component={Chat} />} />

          {/* Rutas Publicas */}
          <Route path="/create-user" element={<UserFormCreate />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;