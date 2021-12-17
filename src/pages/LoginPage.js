import React, { useState } from "react";
import logo from "../assets/images/logo.svg";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div>
      <div>
        {/* <span className="text-5xl text-green-700 font-bold block my-16">
          RUMAH SEHAT
        </span> */}
        <img src={logo} alt="logo" className="w-64 mx-auto my-8" />
      </div>
      <form className="w-96 mx-auto rounded-md border border-gray-300 shadow-md p-8">
        <h1 className="font-bold text-2xl mb-4">Login</h1>
        <div className="mb-4">
          <label className="block text-left" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="rounded-md w-full border-gray-300 border p-1 focus:shadow-[0_0_0_1px_rgb(21,_128,_61)] shadow-green-700 outline-none"
          />
        </div>
        <div className="mb-4">
          <label className="block text-left" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            className="rounded-md w-full border-gray-300 border p-1 focus:shadow-[0_0_0_1px_rgb(21,_128,_61)] shadow-green-700 outline-none"
          />
        </div>
        <button className="px-3 py-1 rounded-md bg-green-700 text-white font-bold">
          Login
        </button>
      </form>
    </div>
  );
};
