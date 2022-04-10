import { addDoc, collection } from "firebase/firestore";
import React, { useState, useContext } from "react";
import { db } from "../config/firebase";
import { SnackbarContext } from "../contexts/SnackbarContext";

export const CreateRegionForm = ({ onClose }) => {
  const [regionName, setRegionName] = useState("");
  const { openSnackbar } = useContext(SnackbarContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
    if (!regionName) {
      openSnackbar("Region name cannot be empty. Failed to create.", "danger");
      return;
    }
    try {
      await addDoc(collection(db, "regions"), {
        name: regionName,
      });
      openSnackbar(`Created region "${regionName}"`, "success");
    } catch (error) {
      openSnackbar("Something happened. Failed to create.", "danger");
    }
  };
  return (
    <div>
      <div className="text-right mb-4">
        <button
          className="ml-2 hover:text-black text-gray-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <h2 className="text-2xl font-bold mb-4">Create New Region</h2>
      <form onSubmit={handleSubmit} className="flex gap-4 flex-wrap">
        <input
          value={regionName}
          onChange={(e) => setRegionName(e.target.value)}
          placeholder="Region Name"
          className="w-full md:w-auto rounded-md border-gray-300 border p-1 ring-primary focus:ring-1 outline-none"
        />
        <button
          type="submit"
          className="w-full md:w-auto px-3 py-1 rounded-md bg-primary text-white font-bold"
        >
          Create
        </button>
      </form>
    </div>
  );
};
