import React, { useContext } from "react";
import logo from "../assets/images/logo.svg";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { SnackbarContext } from "../contexts/SnackbarContext";

export const Header = () => {
  const { openSnackbar } = useContext(SnackbarContext);

  const handleSignOut = () => {
    signOut(auth);
    openSnackbar("Logged out successfully.", "success");
  };

  return (
    <header className="py-2 shadow-md">
      <nav className="flex container mx-auto px-4">
        <img src={logo} alt="logo" width={100} />
        <button className="ml-auto" onClick={handleSignOut}>
          Logout
        </button>
      </nav>
    </header>
  );
};
