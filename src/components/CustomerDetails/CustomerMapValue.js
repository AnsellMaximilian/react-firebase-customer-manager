import React from "react";
import { FaTimes } from "react-icons/fa";

export const CustomerMapValue = ({
  isEditMode,
  map,
  mapTitle,
  setMap,
  newMapValue,
  setNewMapValue,
}) => {
  return (
    <div className="mb-4">
      <h3 className="text-lg font-bold">{mapTitle}</h3>
      <div>
        {Object.keys(map)
          .filter((key) => key !== "id")
          .map((type) => (
            <div key={type} className="grid grid-cols-12 mb-2">
              <div
                className={`font-semibold col-span-4 md:col-span-2 ${
                  isEditMode ? "" : "border-r"
                } border-gray-400`}
              >
                {type}
              </div>
              <div
                className={`${
                  isEditMode ? "col-span-12 mt-2" : "col-span-8 pl-2 "
                } md:col-span-10`}
              >
                {isEditMode ? (
                  <div className="flex gap-4">
                    <input
                      onChange={(e) =>
                        setMap((map) => ({
                          ...map,
                          [type]: e.target.value,
                        }))
                      }
                      value={map[type]}
                      className="rounded-md border-gray-300 border p-1 ring-primary focus:ring-1 outline-none"
                    />
                    <button
                      className="text-white bg-red-600 py-1 px-3 rounded-md"
                      onClick={() =>
                        setMap((map) => {
                          if (map) {
                            return Object.keys(map).reduce((obj, key) => {
                              if (key === type) {
                                return obj;
                              }
                              return { ...obj, [key]: map[key] };
                            }, {});
                          }
                          return map;
                        })
                      }
                    >
                      <FaTimes />
                    </button>
                  </div>
                ) : (
                  map[type]
                )}
              </div>
            </div>
          ))}
      </div>
      {isEditMode &&
        (newMapValue ? (
          <form
            className="grid grid-cols-12 md:flex flex-wrap gap-x-4 gap-y-2"
            onSubmit={(e) => {
              e.preventDefault();
              if (newMapValue.type) {
                setMap((phoneNumbers) => ({
                  ...phoneNumbers,
                  [newMapValue.type]: newMapValue.value,
                }));
                setNewMapValue(null);
              }
            }}
          >
            <div className="font-semibold col-span-12 w-full">New Number</div>
            <input
              value={newMapValue.type}
              onChange={(e) =>
                setNewMapValue((phoneNumber) => ({
                  ...phoneNumber,
                  type: e.target.value,
                }))
              }
              placeholder="Type"
              className="col-span-6 rounded-md border-gray-300 border p-1 ring-primary focus:ring-1 outline-none"
            />
            <input
              value={newMapValue.value}
              onChange={(e) =>
                setNewMapValue((phoneNumber) => ({
                  ...phoneNumber,
                  value: e.target.value,
                }))
              }
              placeholder="Number"
              className="col-span-6 rounded-md border-gray-300 border p-1 ring-primary focus:ring-1 outline-none"
            />

            <button className="col-span-12 px-3 py-1 rounded-md bg-primary text-white font-bold">
              Add
            </button>
          </form>
        ) : (
          <button
            className="text-green-600"
            onClick={() => setNewMapValue({ type: "", value: "" })}
          >
            + Add Phone Number
          </button>
        ))}
    </div>
  );
};
