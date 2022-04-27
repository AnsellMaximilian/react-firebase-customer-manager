import React, { useState, useEffect } from "react";
import FadeLoader from "react-spinners/FadeLoader";
import {
  updateDoc,
  doc,
  getDoc,
  Timestamp,
  collection,
  addDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore";
import { db } from "../../config/firebase";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import Details from "./Details";
import Form from "./Form";
import AdditionalInfoForm from "./AdditionalInfoForm";
import AdditionalInfo from "./AdditionalInfo";

export const CustomerDetails = ({ customer, onClose, isNew, regions }) => {
  const [isEditMode, setIsEditMode] = useState(isNew || false);
  const [address, setAddress] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [customerName, setCustomerName] = useState("");
  const [customerRegion, setCustomerRegion] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Nicknames
  const [nickname, setNickname] = useState("");
  const [nicknames, setNicknames] = useState([]);

  // Additional info
  const [additionalInfo, setAdditionalInfo] = useState({});

  const updateCustomer = async (customerId) => {
    setIsEditMode(false);
    if (!customerName || !customerRegion) {
      toast.error(
        "Either customer name or region was empty. Operation was cancelled."
      );
      return;
    }
    try {
      await updateDoc(doc(db, "customers", customerId), {
        name: customerName,
        region: customerRegion,
        address: address,
        phoneNumber: phoneNumber,
        nicknames: nicknames,
      });

      setDoc(doc(db, "additionalInfo", customerId), additionalInfo);

      toast.success(`Updated customer "${customerName}"`);
    } catch (error) {
      toast.error("Something happened. Failed to update.");
    }
  };

  const createCustomer = async () => {
    onClose();
    if (!customerName || !customerRegion) {
      toast.error(
        "Either customer name or region was empty. Operation was cancelled."
      );
      return;
    }
    try {
      const newCustomer = await addDoc(collection(db, "customers"), {
        name: customerName,
        region: customerRegion,
        address: address,
        phoneNumber: phoneNumber,
        nicknames: nicknames,
        createdAt: Timestamp.now(),
      });

      setDoc(doc(db, "additionalInfo", newCustomer.id), additionalInfo);

      toast.success(`Added customer "${customerName}"`);
    } catch (error) {
      toast.error("Something happened. Failed to add.");
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
        deleteDoc(doc(db, "additionalInfo", customerId));

        toast.success(`Deleted customer "${customerName}"`);
      } catch (error) {
        toast.error("Something happened. Failed to delete.");
      }
    }
  };

  const addNickname = (e) => {
    e.preventDefault();
    if (nickname) {
      setNicknames((prev) => [...prev, nickname]);
      setNickname("");
    } else {
      toast.error("Cannot be empty");
    }
  };

  const deleteNickname = (index) =>
    setNicknames((prev) =>
      prev.filter((name, nickIndex) => nickIndex !== index)
    );

  useEffect(() => {
    (async () => {
      if (customer) {
        setAddress(customer.address);
        setPhoneNumber(customer.phoneNumber);
        setCustomerName(customer.name);
        setCustomerRegion(customer.region);
        setNicknames(customer.nicknames || []);
        if (!isNew) {
          const additionalInfo = await getDoc(
            doc(db, "additionalInfo", customer.id)
          );
          setAdditionalInfo(
            additionalInfo.exists() ? additionalInfo.data() : {}
          );
        }
        setIsLoading(false);
      }
    })();
  }, [customer, isNew]);

  return !isLoading &&
    customer &&
    //     // address &&
    //     // phoneNumber &&
    customerRegion &&
    regions.length > 1000 ? (
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
        <Form
          customerName={customerName}
          nicknames={nicknames}
          customerRegion={customerRegion}
          address={address}
          phoneNumber={phoneNumber}
          regions={regions}
          nickname={nickname}
          setCustomerName={setCustomerName}
          setCustomerRegion={setCustomerRegion}
          setNickname={setNickname}
          setAddress={setAddress}
          setPhoneNumber={setPhoneNumber}
          deleteNickname={deleteNickname}
          addNickname={addNickname}
        />
      ) : (
        <Details
          region={regions.find((region) => region.id === customerRegion).name}
          customerName={customerName}
          address={address}
          phoneNumber={phoneNumber}
          nicknames={nicknames}
        />
      )}
      {isEditMode ? (
        <AdditionalInfoForm
          additionalInfo={additionalInfo}
          setAdditionalInfo={setAdditionalInfo}
        />
      ) : (
        <AdditionalInfo additionalInfo={additionalInfo} />
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
    <div className="flex items-center justify-center w-full h-full">
      <FadeLoader color="rgb(21 128 61)" />
    </div>
  );
};

export default CustomerDetails;
