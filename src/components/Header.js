import React from "react";
import logo from "../assets/images/logo.svg";

export const Header = () => {
  return (
    <header className="px-4 py-2 shadow-md container mx-auto">
      <nav className="flex">
        <img src={logo} alt="logo" width={100} />
        <button className="ml-auto">Logout</button>
      </nav>
    </header>
  );
};
