import React, { useState } from "react";
import logo from "../assets/images/logo.svg";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../config/firebase";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        navigate("/");
        toast.success(`Signed in as ${user.user.email}`);
      } catch (error) {
        toast.error("Something happened. Failed to login.");
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
            className="rounded-md w-full border-gray-300 border p-1 ring-primary focus:ring-1 outline-none"
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
            className="rounded-md w-full border-gray-300 border p-1 ring-primary focus:ring-1 outline-none"
          />
        </div>
        <button className="btn-primary">Login</button>
      </form>
    </div>
  );
};
