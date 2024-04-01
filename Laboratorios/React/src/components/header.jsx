import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/DNNSoftwareLogo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/authSlice";
import { useState } from "react";

export default function Header() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log(user);

  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("sessionData");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white py-5 flex justify-between items-center">
      <ul className="flex px-8 space-x-5">
        <div>
          <li className="ml-auto">
            <img
              src={logo}
              alt="Logo"
              style={{
                width: 60,
                height: 60,
              }}
            />
          </li>
        </div>
        <div className="flex relative items-center ">
          {!isAuthenticated ? null : (
            <>
              <li className="px-3">
                <Link to={"/"} className="hover:text-green-200 hover:font-bold">
                  Inicio
                </Link>
              </li>
              <li className="px-3">
                <Link
                  to={"/users"}
                  className="hover:text-green-200 hover:font-bold"
                >
                  Usuarios
                </Link>
              </li>
            </>
          )}
          <li className="px-3">
            <Link
              to={"/create-user"}
              className="hover:text-green-200 hover:font-bold"
            >
              Crear usuarios
            </Link>
          </li>
        </div>
      </ul>
      <div className="relative flex rounded-full bg-gray-800 focus:outine-none focus:rin-2 px-5">
          {isAuthenticated ? (
            <>
              <div className="relative">
                <img
                  src={`http://localhost:9090/${user.avatar}`}
                  alt="Avatar"
                  className="rounded-full h-10 w-10 cursor-pointer"
                  // onClick={toggleMenu}
                  onMouseOver={toggleMenu}
                />
                {isOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                    <p className="block px-4 py-2 text-sm text-red-400 font-bold">
                      {user.name} {user.lastname}
                    </p>
                    <Link
                      to={`/user/${user._id}`}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:font-bold"
                    >
                      Profile
                    </Link>
                    <a
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer hover:font-bold"
                    >
                      Logout
                    </a>
                  </div>
                )}
              </div>
            </>
          ) : (
              <button
                onClick={handleLogout}
                className="hover:text-green-200 hover:font-bold"
              >
                Login
              </button>
          )}
      </div>
    </nav>
  );
}