import React, { useContext } from "react";
import logo from "../assets/images/logo.svg";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { SnackbarContext } from "../contexts/SnackbarContext";
import { Link } from "react-router-dom";

export const Header = () => {
  const { openSnackbar } = useContext(SnackbarContext);

  const handleSignOut = () => {
    signOut(auth);
    openSnackbar("Logged out successfully.", "success");
  };

  return (
    <header className="shadow-md">
      <nav className="border-b border-grey-400 py-2">
        <div className="container mx-auto flex px-4 ">
          <Link to="/">
            <img src={logo} alt="logo" width={100} />
          </Link>
          <button className="ml-auto" onClick={handleSignOut}>
            Logout
          </button>
        </div>
      </nav>
      <nav className="container mx-auto px-4">
        <ul className="flex gap-4">
          <li className="transition-all border-b-2 font-bold text-gray-500 hover:text-black border-white hover:border-green-700">
            <Link to="/customers" className="px-3 py-1 block ">
              Customers
            </Link>
          </li>
          <li className="transition-all hover:border-b-2 font-bold text-gray-500 hover:text-black border-green-700">
            <Link to="/customers" className="px-3 py-1 block ">
              Customers
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
