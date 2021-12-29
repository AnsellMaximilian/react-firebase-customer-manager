import {
  onSnapshot,
  query,
  collection,
  getDocs,
  where,
  deleteDoc,
  doc,
} from "firebase/firestore";
import React, { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import PulseLoader from "react-spinners/PulseLoader";
import { Header } from "../components/Header";
import { db } from "../config/firebase";
import { FaPlus, FaTrash } from "react-icons/fa";
import { CreateRegionForm } from "../components/CreateRegionForm";
import { SnackbarContext } from "../contexts/SnackbarContext";

export const RegionsPage = () => {
  const [regions, setRegions] = useState([]);
  const [isNewRegionModalOpen, setIsNewRegionModalOpen] = useState(false);
  const { openSnackbar } = useContext(SnackbarContext);

  const closeNewRegionModal = () => setIsNewRegionModalOpen(false);

  const deleteRegion = async (region) => {
    const regionCustomers = await getDocs(
      query(collection(db, "customers"), where("region", "==", region.id))
    );
    const regionCustomersCount = regionCustomers.docs.length;
    if (regionCustomersCount > 0) {
      openSnackbar(
        `Cannot delete. There are ${regionCustomersCount} customers in this region.`,
        "danger"
      );
    } else {
      try {
        await deleteDoc(doc(db, "regions", region.id));
        openSnackbar(`Successfully deleted region "${region.name}"`, "success");
      } catch (error) {
        openSnackbar(
          `Something happened. Cannot delete region "${region.name}"`,
          "danger"
        );
      }
    }
  };

  useEffect(() => {
    const regionsQuery = query(collection(db, "regions"));

    const unsub = onSnapshot(regionsQuery, async (querySnapshot) => {
      const regionDocs = querySnapshot.docs.map((regionDoc) => ({
        id: regionDoc.id,
        ...regionDoc.data(),
      }));
      setRegions(regionDocs);
    });
    return () => unsub();
  }, []);
  return (
    <div>
      <Header />
      <h1 className="mt-4 text-2xl font-bold">Regions List</h1>
      <div className="px-4 mt-4 container mx-auto">
        {regions.length > 0 ? (
          <div className="grid grid-cols-12 shadow-md">
            {regions.map((region) => {
              return (
                <div
                  className="hover:relative group col-span-6 md:col-span-3 p-10 border cursor-pointer bg-white hover:scale-125 transition-all hover:bg-green-700 hover:text-white"
                  key={region.id}
                >
                  <button
                    onClick={() => deleteRegion(region)}
                    className="hidden hover:bg-red-700 absolute right-2 top-2 group-hover:block bg-red-600 text-white p-2 rounded-md"
                  >
                    <FaTrash size={12.5} />
                  </button>
                  <div>{region.name}</div>
                </div>
              );
            })}
            <div
              className="flex col-span-6 md:col-span-3 p-8 border cursor-pointer bg-white hover:scale-125 transition-all hover:bg-green-700 hover:text-white"
              key="new-region"
              title="Add new region"
              onClick={() => setIsNewRegionModalOpen(true)}
            >
              <div className="flex justify-center items-center w-full">
                <FaPlus size={25} />
              </div>
            </div>
          </div>
        ) : (
          <div>
            <div className="font-bold text-2xl mb-4">Loading regions...</div>
            <PulseLoader color="rgb(21 128 61)" size={25} />
          </div>
        )}
      </div>
      <Modal isOpen={isNewRegionModalOpen} onRequestClose={closeNewRegionModal}>
        <CreateRegionForm onClose={closeNewRegionModal} />
      </Modal>
    </div>
  );
};