import React, { useState, useEffect, useContext } from "react";
import CircleLoader from "react-spinners/CircleLoader";
import {
  updateDoc,
  doc,
  Timestamp,
  collection,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { SnackbarContext } from "../contexts/SnackbarContext";
import Swal from "sweetalert2";

export const CustomerDetails = ({ customer, onClose, isNew, regions }) => {
  const [isEditMode, setIsEditMode] = useState(isNew || false);
  const [address, setAddress] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerRegion, setCustomerRegion] = useState(null);

  const { openSnackbar } = useContext(SnackbarContext);

  const updateCustomer = async (customerId) => {
    setIsEditMode(false);
    if (!customerName || !customerRegion) {
      openSnackbar(
        "Either customer name or region was empty. Operation was cancelled.",
        "danger"
      );
      return;
    }
    try {
      await updateDoc(doc(db, "customers", customerId), {
        name: customerName,
        region: customerRegion,
        address: address,
        phoneNumber: phoneNumber,
      });

      openSnackbar(`Updated customer "${customerName}"`, "success");
    } catch (error) {
      openSnackbar("Something happened. Failed to update.", "danger");
    }
  };

  const createCustomer = async () => {
    onClose();
    if (!customerName || !customerRegion) {
      openSnackbar(
        "Either customer name or region was empty. Operation was cancelled.",
        "danger"
      );
      return;
    }
    try {
      await addDoc(collection(db, "customers"), {
        name: customerName,
        region: customerRegion,
        address: address,
        phoneNumber: phoneNumber,
        createdAt: Timestamp.now(),
      });

      openSnackbar(`Added customer "${customerName}"`, "success");
    } catch (error) {
      openSnackbar("Something happened. Failed to add.", "danger");
    }
  };

  const deleteCustomer = async (customerId) => {
    const confirmation = await Swal.fire({
      title: "Warning!",
      text: "Are you sure?",
      icon: "warning",
      confirmButtonText: "Yes",
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonColor: "#b51919",
    });

    if (confirmation.isConfirmed) {
      onClose();
      try {
        await deleteDoc(doc(db, "customers", customerId));
        openSnackbar(`Deleted customer "${customerName}"`, "success");
      } catch (error) {
        openSnackbar("Something happened. Failed to delete.", "danger");
      }
    }
  };

  useEffect(() => {
    if (customer) {
      setAddress(customer.address);
      setPhoneNumber(customer.phoneNumber);
      setCustomerName(customer.name);
      setCustomerRegion(customer.region);
    }
  }, [customer]);

  return customer &&
    // address &&
    // phoneNumber &&
    customerRegion &&
    regions.length > 0 ? (
    <div>
      <div className="flex justify-between p-4 border-b border-gray-200">
        <h2 className="font-bold text-2xl">
          {isNew
            ? "Create Customer"
            : `${isEditMode ? "Editing " : ""} ${customerName}`}
        </h2>
        <button
          className="ml-2 hover:text-black text-gray-600"
          onClick={onClose}
        >
          Close
        </button>
      </div>
      {!isNew && (
        <div className="text-right px-4 py-2 border-b border-gray-200">
          {!isEditMode && (
            <button
              className="btn-danger"
              onClick={() => deleteCustomer(customer.id)}
            >
              Delete
            </button>
          )}
          <button
            className={`ml-1 ${isEditMode ? "btn-secondary" : "btn-primary"}`}
            onClick={() => setIsEditMode(!isEditMode)}
          >
            {isEditMode ? "Cancel Edit" : "Edit"}
          </button>
        </div>
      )}
      {isEditMode ? (
        <div className="flex flex-col gap-4 p-4">
          <div>
            <h3 className="text-lg font-semibold">Name</h3>
            <input
              placeholder="Customer Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="rounded-md border-gray-300 border p-1 ring-primary focus:ring-1 outline-none"
            />
          </div>
          <div className="">
            <h3 className="text-lg font-semibold">Region</h3>
            <div>
              <select
                className="rounded-md border-gray-300 border p-1 ring-primary focus:ring-1 outline-none"
                value={customerRegion}
                onChange={(e) => setCustomerRegion(e.target.value)}
              >
                {regions.map((region) => (
                  <option key={region.id} value={region.id}>
                    {region.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold">Address</h3>
            <textarea
              value={address}
              placeholder="Customer Address"
              className="rounded-md border-gray-300 border p-1 ring-primary focus:ring-1 outline-none"
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Phone</h3>
            <input
              placeholder="Customer Phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="rounded-md border-gray-300 border p-1 ring-primary focus:ring-1 outline-none"
            />
          </div>
        </div>
      ) : (
        <div className="mb-4 flex flex-col gap-4 p-4">
          <div className="">
            <h3 className="text-lg font-semibold">Name</h3>
            <div>{customerName}</div>
          </div>
          <div className="">
            <h3 className="text-lg font-semibold">Region</h3>
            <div>
              {regions.find((region) => region.id === customerRegion).name}
            </div>
          </div>
          <div className="">
            <h3 className="text-lg font-semibold">Address</h3>
            <div>{address}</div>
          </div>
          <div className="">
            <h3 className="text-lg font-semibold">Phone</h3>
            <div>{phoneNumber}</div>
          </div>
        </div>
      )}
      {isEditMode && (
        <div className="text-right px-4 py-2 border-t border-gray-200">
          <button
            className="btn-primary"
            onClick={() => {
              if (isNew) {
                createCustomer();
              } else {
                updateCustomer(customer.id);
              }
            }}
          >
            {isNew ? "Create" : "Save Changes"}
          </button>
        </div>
      )}
    </div>
  ) : (
    <CircleLoader />
  );
};
