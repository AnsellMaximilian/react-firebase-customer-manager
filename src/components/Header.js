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
    <header className="py-2 shadow-md">
      <nav className="flex container mx-auto px-4">
        <Link to="/">
          <img src={logo} alt="logo" width={100} />
        </Link>
        <button className="ml-auto" onClick={handleSignOut}>
          Logout
        </button>
      </nav>
    </header>
  );
};
