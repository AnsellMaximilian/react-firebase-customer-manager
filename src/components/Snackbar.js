import React, { useState } from "react";
import { SnackbarContext } from "../contexts/SnackbarContext";

const statuses = ["success", "danger", "warning"];

export const Snackbar = () => {
  const [text, setText] = useState("");
  const [status, setStatus] = useStatus("success");
  const [isOpen, setIsOpen] = useState(false);

  const openSnackbar = (text, status) => {
    setIsOpen(true);
    setText(text);
    setStatus(status);
  };

  const closeSnackbar = () => {
    setIsOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ openSnackbar, closeSnackbar }}>
      <div className="fixed bottom-0 left-0">
        <div>{text}</div>
        <div>{isOpen}</div>
        <div>{status}</div>
      </div>
    </SnackbarContext.Provider>
  );
};

const useStatus = (initialStatus) => {
  const [status, setStatus] = useState(initialStatus);

  const validatedStatus = statuses.includes(status) ? status : statuses[0];

  return [validatedStatus, setStatus];
};
