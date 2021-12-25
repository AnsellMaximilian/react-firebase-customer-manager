import React from "react";
import logo from "../assets/images/logo.svg";

export const Header = () => {
  return (
    <header className="py-2 shadow-md">
      <nav className="flex container mx-auto px-4">
        <img src={logo} alt="logo" width={100} />
        <button className="ml-auto">Logout</button>
      </nav>
    </header>
  );
};
