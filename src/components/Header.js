import React, { useContext } from "react";
import logo from "../assets/images/logo.svg";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { SnackbarContext } from "../contexts/SnackbarContext";
import { Link, NavLink } from "react-router-dom";

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
          <li className="">
            <PageLink to="/customers">Customers</PageLink>
          </li>
          <li className="">
            <PageLink to="/regions">Regions</PageLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

const PageLink = ({ to, children }) => {
  const initialClassName =
    "px-3 py-1 block transition-all border-b-4 font-bold text-gray-500 hover:text-black hover:border-green-700";
  const activeClassName = "text-black border-green-700";
  const inactiveClassName = "border-white";
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `${initialClassName} ${isActive ? activeClassName : inactiveClassName}`
      }
    >
      {children}
    </NavLink>
  );
};
