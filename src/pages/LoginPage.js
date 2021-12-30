import React, { useState, useContext } from "react";
import logo from "../assets/images/logo.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { SnackbarContext } from "./../contexts/SnackbarContext";

export const LoginPage = () => {
  const navigate = useNavigate();

  const { openSnackbar } = useContext(SnackbarContext);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
        openSnackbar(`Signed in as ${user.user.email}`, "success");
      } catch (error) {
        openSnackbar("Something happened. Failed to login.", "danger");
      }
    })();
  };
  return (
    <div className="mx-auto px-4 container">
      <div>
        <img src={logo} alt="logo" className="w-64 mx-auto my-8" />
      </div>
      <form
        className="max-w-full w-96 mx-auto rounded-md border border-gray-300 shadow-md p-8"
        onSubmit={handleLogin}
      >
        <h1 className="font-bold text-2xl mb-4">Login</h1>
        <div className="mb-4">
          <label className="block text-left" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
