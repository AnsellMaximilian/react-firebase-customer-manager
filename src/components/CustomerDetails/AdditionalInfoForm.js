import React, { useState } from "react";

const AdditionalInfoForm = ({ additionalInfo, setAdditionalInfo }) => {
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");

  const addNewInfo = () => {
    if (newKey && newValue) {
      setAdditionalInfo((prev) => ({
        ...prev,
        [newKey]: newValue,
      }));
      setNewKey("");
      setNewValue("");
    }
  };

  const deleteInfo = (key) => {
    setAdditionalInfo((prev) => {
      const newObj = {};
      for (const info in prev) {
        if (key !== info) {
          newObj[info] = prev[info];
        }
      }
      return newObj;
    });
  };

  return (
    <div className="p-4 border-t border-gray-200">
      <div className="text-2xl font-bold mb-4">Additional Information</div>
      <div className="mb-2">
        <div className="text-xl font-bold">New Info</div>
        <div className="flex flex-col md:flex-row gap-4 items-end">
          <div>
            <div className="text-lg font-semibold">Key</div>
            <input
              placeholder="Key"
              value={newKey}
              onChange={(e) => setNewKey(e.target.value)}
              className="rounded-md border-gray-300 border p-1 ring-primary focus:ring-1 outline-none min-w-0"
            />
          </div>
          <div>
            <div className="text-lg font-semibold">Value</div>
            <input
              placeholder="Value"
              value={newValue}
              onChange={(e) => setNewValue(e.target.value)}
              className="rounded-md border-gray-300 border p-1 ring-primary focus:ring-1 outline-none min-w-0"
            />
          </div>
          <button className="btn-secondary" onClick={addNewInfo}>
            Add
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        {Object.keys(additionalInfo).map((key) => (
          <div key={key} className="">
            <h4 className="text-xl font-semibold">{key}</h4>
            <div className="flex gap-2">
              <input
                placeholder={key}
                value={additionalInfo[key]}
                onChange={(e) =>
                  setAdditionalInfo((prev) => ({
                    ...prev,
                    [key]: e.target.value,
                  }))
                }
                className="rounded-md border-gray-300 border p-1 ring-primary focus:ring-1 outline-none min-w-0"
              />
              <button
                className="bg-red-600 text-white rounded-md px-2"
                onClick={() => deleteInfo(key)}
              >
                &times;
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
