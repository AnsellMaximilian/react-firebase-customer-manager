import { addDoc, collection } from "firebase/firestore";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { db } from "../config/firebase";

export const CreateRegionForm = ({ onClose }) => {
  const [regionName, setRegionName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    onClose();
    if (!regionName) {
      toast.error("Region name cannot be empty. Failed to create.");
      return;
    }
    try {
      await addDoc(collection(db, "regions"), {
        name: regionName,
      });
      toast.success(`Created region "${regionName}"`);
    } catch (error) {
      toast.error("Something happened. Failed to create.", "danger");
    }
  };
  return (
    <div>
      <div className="flex justify-between p-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold">Create New Region</h2>
        <button
          className="ml-2 hover:text-black text-gray-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <form
        onSubmit={handleSubmit}
        className="flex gap-4 flex-wrap p-4 justify-center"
      >
        <input
          value={regionName}
          onChange={(e) => setRegionName(e.target.value)}
          placeholder="Region Name"
          className="grow w-full md:w-auto rounded-md border-gray-300 border p-1 ring-primary focus:ring-1 outline-none"
        />
        <button type="submit" className="w-full md:w-auto btn-primary">
          Create
        </button>
      </form>
    </div>
  );
};
