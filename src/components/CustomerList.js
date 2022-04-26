import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import { FaFilePdf } from "react-icons/fa";
import CustomerDetails from "./CustomerDetails";

export const CustomerList = ({ customers, regions }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");
  const [customerDetails, setCustomerDetails] = useState(null);
  const [filteredCustomers, setFilteredCustomers] = useState([]);
  const [filteredRegions, setFilteredRegions] = useState([]);

  const openDetailsModal = (customer) => {
    setCustomerDetails(customer);
  };

  useEffect(() => {
    if (regionFilter !== "all") {
      setFilteredRegions(
        regions.filter((region) => region.id === regionFilter)
      );
    } else {
      setFilteredRegions(regions);
    }
  }, [regionFilter, regions]);

  useEffect(() => {
    if (globalFilter) {
      setFilteredCustomers(
        customers.filter((customer) => {
          return (
            customer.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
            customer.address
              .toLowerCase()
              .includes(globalFilter.toLowerCase()) ||
            customer.phoneNumber
              .toLowerCase()
              .includes(globalFilter.toLowerCase()) ||
            (customer.nicknames &&
              customer.nicknames
                .join("")
                .toLowerCase()
                .includes(globalFilter.toLowerCase()))
          );
        })
      );
    } else {
      setFilteredCustomers(customers);
    }
  }, [globalFilter, customers]);

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Customer List</h1>
      <div className="mb-4 flex gap-4 justify-end">
        <button
          className="btn-primary"
          onClick={() => {
            setCustomerDetails({
              name: "",
              region: regions[0].id,
              address: "",
              phoneNumber: "",
            });
          }}
        >
          Add New
        </button>
        <button
          className="btn bg-red-600 text-white font-bold"
          onClick={() => window.print()}
        >
          <FaFilePdf className="" />
        </button>
      </div>
      <div className="mb-4 grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <label
            htmlFor="searchFilter"
            className="text-left block w-full text-sm"
          >
            Search:
          </label>
          <input
            id="searchFilter"
            type="search"
            className="w-full rounded-md border-gray-300 border p-1 ring-primary focus:ring-1 outline-none"
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            placeholder="Search..."
          />
        </div>
        <div className="col-span-4">
          <label
            htmlFor="regionFilter"
            className="text-left block w-full text-sm"
          >
            Filter by Region:
          </label>
          <select
            id="regionFilter"
            className="w-full rounded-md border-gray-300 border p-1 ring-primary focus:ring-1 outline-none"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="all">All Regions</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="rounded-md shadow-md print-container">
        {filteredRegions
          .filter(
            (region) =>
              filteredCustomers.filter(
                (customer) => customer.region === region.id
              ).length > 0
          )
          .map((region) => (
            <div key={region.id}>
              <div className="bg-primary text-white p-2 font-bold">
                {region.name}
              </div>
              <div>
                {filteredCustomers
                  .filter((customer) => customer.region === region.id)
                  .map((customer, index) => (
                    <div
                      onClick={() => openDetailsModal(customer)}
                      key={customer.id}
                      className={`hover:bg-green-200 cursor-pointer p-2 grid grid-cols-12 ${
                        index % 2 === 0 ? "bg-green-100" : "bg-green-50"
                      }`}
                    >
                      <div className="col-span-3">{customer.name}</div>
                      <div className="col-span-3">{customer.phoneNumber}</div>
                      <div className="col-span-6 text-left">
                        {customer.address}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          ))}
      </div>
      <Modal
        isOpen={!!customerDetails}
        onRequestClose={() => setCustomerDetails(null)}
        style={{
          overlay: { backgroundColor: "rgba(0, 0, 0, 0.6)" },
          content: { padding: 0 },
        }}
      >
        <CustomerDetails
          customer={customerDetails}
          onClose={() => setCustomerDetails(null)}
          regions={regions}
          isNew={!!!customerDetails?.id}
        />
      </Modal>
    </div>
  );
};
