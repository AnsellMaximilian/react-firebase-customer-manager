import React, { useState } from "react";
import { SnackbarContext } from "../contexts/SnackbarContext";
import { FaTimes } from "react-icons/fa";

const statuses = ["success", "danger", "warning"];

const classes = {
  success: "bg-green-500 text-white",
  danger: "bg-red-500 text-white",
  warning: "bg-orange-500",
};

export const Snackbar = ({ children }) => {
  const [text, setText] = useState("");
  const [status, setStatus] = useStatus("danger");
  const [isOpen, setIsOpen] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const openSnackbar = (text, status) => {
    clearTimeout(timeoutId);
    setTimeoutId(setTimeout(() => setIsOpen(false), 3000));
    setIsOpen(true);
    setText(text);
    setStatus(status);
  };

  const closeSnackbar = () => {
    setIsOpen(false);
  };

  const statusClasses = isOpen ? "opacity-1" : "opacity-0 translate-y-20";

  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
      {children}
      <div
        style={{ zIndex: 1000 }}
        className={`fixed bottom-4 left-4 p-4 min-w-[350px] rounded-md flex justify-between shadow-md transition-all ${classes[status]} ${statusClasses}`}
      >
        <div className="font-bold">{text}</div>
        <button className="" onClick={closeSnackbar}>
          <FaTimes />
        </button>
      </div>
    </SnackbarContext.Provider>
  );
};

const useStatus = (initialStatus) => {
  const [status, setStatus] = useState(initialStatus);
  // console.log(statuses.includes(status));
  const validatedStatus = statuses.includes(status) ? status : statuses[0];

  return [validatedStatus, setStatus];
};
