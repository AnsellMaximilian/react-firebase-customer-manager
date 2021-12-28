import React, { useState } from "react";
import CircleLoader from "react-spinners/CircleLoader";
import { useEffect } from "react/cjs/react.development";
import { FaTimes } from "react-icons/fa";
import {
  updateDoc,
  doc,
  setDoc,
  Timestamp,
  collection,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import clearProperties from "../utils/clearProperties";

export const CustomerDetails = ({ customer, onClose, isNew, regions }) => {
  const [isEditMode, setIsEditMode] = useState(isNew || false);
  const [addresses, setAddresses] = useState(null);
  const [phoneNumbers, setPhoneNumbers] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerRegion, setCustomerRegion] = useState(null);
  const [newAddress, setNewAddress] = useState(null);
  const [newPhoneNumber, setNewPhoneNumber] = useState(null);
  const updateCustomer = async (customerId) => {
    setIsEditMode(false);

    try {
      await updateDoc(doc(db, "customers", customerId), {
        name: customerName,
        region: customerRegion,
      });

      await setDoc(
        doc(db, "addresses", customerId),
        clearProperties(addresses, ["id"])
      );

      await setDoc(
        doc(db, "phoneNumbers", customerId),
        clearProperties(phoneNumbers, ["id"])
      );

      console.log("Customer Updated");
    } catch (error) {
      console.log(error);
    }
  };

  const createCustomer = async () => {
    onClose();
    try {
      const cusDocRef = await addDoc(collection(db, "customers"), {
        name: customerName,
        region: customerRegion,
        createdAt: Timestamp.now(),
      });

      await setDoc(
        doc(db, "addresses", cusDocRef.id),
        clearProperties(addresses, ["id"])
      );

      await setDoc(
        doc(db, "phoneNumbers", cusDocRef.id),
        clearProperties(phoneNumbers, ["id"])
      );

      console.log(`added customer ${customer.name}`);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteCustomer = async (customerId) => {
    onClose();

    try {
      await deleteDoc(doc(db, "customers", customerId));
      console.log(`Deleted customer with id ${customerId}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (customer) {
      setAddresses(customer.address);
      setPhoneNumbers(customer.phone);
      setCustomerName(customer.name);
      setCustomerRegion(customer.region);
    }
  }, [customer]);

  return customer &&
    addresses &&
    phoneNumbers &&
    customerRegion &&
    regions.length > 0 ? (
    <div>
      <div className="text-right mb-4">
        <button
          className="ml-2 hover:text-black text-gray-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      <div className="mb-4 flex justify-between">
        {isEditMode ? (
          <input
            placeholder="Customer Name"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            className="rounded-md border-gray-300 border p-1 focus:shadow-[0_0_0_1px_rgb(21,_128,_61)] shadow-green-700 outline-none"
          />
        ) : (
          <h2 className="text-2xl font-bold">{customerName}</h2>
        )}
        {!isNew && (
          <div>
            {!isEditMode && (
              <button
                className="text-red-600 hover:text-red-700"
                onClick={() => deleteCustomer(customer.id)}
              >
                Delete
              </button>
            )}
            <button
              className="text-green-600 ml-2 hover:text-green-700"
              onClick={() => setIsEditMode(!isEditMode)}
            >
              {isEditMode ? "Cancel Edit" : "Edit"}
            </button>
          </div>
        )}
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold">Phone Numbers</h3>
        <div>
          {Object.keys(phoneNumbers)
            .filter((key) => key !== "id")
            .map((type) => (
              <div key={type} className="grid grid-cols-12 mb-2">
                <div className="font-semibold col-span-2 md:col-span-1 border-r border-gray-400">
                  {type}
                </div>
                <div className="pl-2 col-span-10 md:col-span-11">
                  {isEditMode ? (
                    <div className="flex gap-4">
                      <input
                        onChange={(e) =>
                          setPhoneNumbers((phoneNumbers) => ({
                            ...phoneNumbers,
                            [type]: e.target.value,
                          }))
                        }
                        value={phoneNumbers[type]}
                        className="rounded-md border-gray-300 border p-1 focus:shadow-[0_0_0_1px_rgb(21,_128,_61)] shadow-green-700 outline-none"
                      />
                      <button
                        className="text-white bg-red-600 py-1 px-3 rounded-md"
                        onClick={() =>
                          setPhoneNumbers((phoneNumbers) => {
                            if (phoneNumbers) {
                              return Object.keys(phoneNumbers).reduce(
                                (obj, key) => {
                                  if (key === type) {
                                    return obj;
                                  }
                                  return { ...obj, [key]: phoneNumbers[key] };
                                },
                                {}
                              );
                            }
                            return phoneNumbers;
                          })
                        }
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    phoneNumbers[type]
                  )}
                </div>
              </div>
            ))}
        </div>
        {isEditMode &&
          (newPhoneNumber ? (
            <form
              className="flex gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (newPhoneNumber.type) {
                  setPhoneNumbers((phoneNumbers) => ({
                    ...phoneNumbers,
                    [newPhoneNumber.type]: newPhoneNumber.value,
                  }));
                  setNewPhoneNumber(null);
                }
              }}
            >
              <input
                value={newPhoneNumber.type}
                onChange={(e) =>
                  setNewPhoneNumber((phoneNumber) => ({
                    ...phoneNumber,
                    type: e.target.value,
                  }))
                }
                placeholder="Type"
                className="rounded-md border-gray-300 border p-1 focus:shadow-[0_0_0_1px_rgb(21,_128,_61)] shadow-green-700 outline-none"
              />
              <input
                value={newPhoneNumber.value}
                onChange={(e) =>
                  setNewPhoneNumber((phoneNumber) => ({
                    ...phoneNumber,
                    value: e.target.value,
                  }))
                }
                placeholder="Number"
                className="rounded-md border-gray-300 border p-1 focus:shadow-[0_0_0_1px_rgb(21,_128,_61)] shadow-green-700 outline-none"
              />

              <button className="px-3 py-1 rounded-md bg-green-700 text-white font-bold">
                Add
              </button>
            </form>
          ) : (
            <button
              className="text-green-600"
              onClick={() => setNewPhoneNumber({ type: "", value: "" })}
            >
              + Add Phone Number
            </button>
          ))}
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold">Region</h3>
        <div>
          {isEditMode ? (
            <select
              value={customerRegion}
              onChange={(e) => setCustomerRegion(e.target.value)}
            >
              {regions.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.name}
                </option>
              ))}
            </select>
          ) : (
            <div>
              {regions.find((region) => region.id === customerRegion).name}
            </div>
          )}
        </div>
      </div>
      <div className="mb-4">
        <h3 className="text-lg font-bold">Alamat</h3>
        <div>
          {Object.keys(addresses)
            .filter((key) => key !== "id")
            .map((type) => (
              <div key={type} className="grid grid-cols-12 mb-2">
                <div className="font-semibold col-span-2 md:col-span-1 border-r border-gray-400">
                  {type}
                </div>
                <div className="pl-2 col-span-10 md:col-span-11">
                  {isEditMode ? (
                    <div className="flex gap-4">
                      <input
                        onChange={(e) =>
                          setAddresses((addresses) => ({
                            ...addresses,
                            [type]: e.target.value,
                          }))
                        }
                        value={addresses[type]}
                        className="rounded-md border-gray-300 border p-1 focus:shadow-[0_0_0_1px_rgb(21,_128,_61)] shadow-green-700 outline-none"
                      />
                      <button
                        className="text-white bg-red-600 py-1 px-3 rounded-md"
                        onClick={() =>
                          setAddresses((addresses) => {
                            if (addresses) {
                              return Object.keys(addresses).reduce(
                                (obj, key) => {
                                  if (key === type) {
                                    return obj;
                                  }
                                  return { ...obj, [key]: addresses[key] };
                                },
                                {}
                              );
                            }
                            return addresses;
                          })
                        }
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    addresses[type]
                  )}
                </div>
              </div>
            ))}
        </div>
        {isEditMode &&
          (newAddress ? (
            <form
              className="flex gap-4"
              onSubmit={(e) => {
                e.preventDefault();
                if (newAddress.type) {
                  setAddresses((addresses) => ({
                    ...addresses,
                    [newAddress.type]: newAddress.value,
                  }));
                  setNewAddress(null);
                }
              }}
            >
              <input
                value={newAddress.type}
                onChange={(e) =>
                  setNewAddress((address) => ({
                    ...address,
                    type: e.target.value,
                  }))
                }
                placeholder="Type"
                className="rounded-md border-gray-300 border p-1 focus:shadow-[0_0_0_1px_rgb(21,_128,_61)] shadow-green-700 outline-none"
              />
              <input
                value={newAddress.value}
                onChange={(e) =>
                  setNewAddress((address) => ({
                    ...address,
                    value: e.target.value,
                  }))
                }
                placeholder="Address"
                className="rounded-md border-gray-300 border p-1 focus:shadow-[0_0_0_1px_rgb(21,_128,_61)] shadow-green-700 outline-none"
              />

              <button className="px-3 py-1 rounded-md bg-green-700 text-white font-bold">
                Add
              </button>
            </form>
          ) : (
            <button
              className="text-green-600"
              onClick={() => setNewAddress({ type: "", value: "" })}
            >
              + Add Address
            </button>
          ))}
      </div>
      {isEditMode && (
        <div className="text-right">
          <button
            className="px-3 py-1 rounded-md bg-green-700 text-white font-bold"
            onClick={() => {
              if (isNew) {
                createCustomer();
              } else {
                updateCustomer(customer.id);
              }
            }}
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  ) : (
    <CircleLoader />
  );
};
