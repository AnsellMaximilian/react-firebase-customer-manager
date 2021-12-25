import React, { useState } from "react";

export const CustomerList = ({ customers, regions }) => {
  //   console.log(customers);
  const [globalFilter, setGlobalFilter] = useState("");
  const [regionFilter, setRegionFilter] = useState("all");

  const filteredCustomers = (customers) => {
    if (globalFilter) {
      return customers.filter((customer) => {
        return (
          customer.name.toLowerCase().includes(globalFilter.toLowerCase()) ||
          customer.address.main
            .toLowerCase()
            .includes(globalFilter.toLowerCase()) ||
          customer.phone.mobile
            .toLowerCase()
            .includes(globalFilter.toLowerCase())
        );
      });
    }
    return customers;
  };

  const filteredRegions = (regions) => {
    if (regionFilter !== "all") {
      return regions.filter((region) => region.id === regionFilter);
    }

    return regions;
  };

  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">Customer List</h1>
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
            className="w-full rounded-md border-gray-300 border p-1 focus:shadow-[0_0_0_1px_rgb(21,_128,_61)] shadow-green-700 outline-none"
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
            className="w-full rounded-md border-gray-300 border p-1 focus:shadow-[0_0_0_1px_rgb(21,_128,_61)] shadow-green-700 outline-none"
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
      <div className="rounded-md shadow-md">
        {filteredRegions(regions).map((region) => (
          <div key={region.id}>
            <div className="bg-green-700 text-white p-2 font-bold">
              {region.name}
            </div>
            <div>
              {filteredCustomers(customers)
                .filter((customer) => customer.region === region.id)
                .map((customer, index) => (
                  <div
                    key={customer.id}
                    className={`hover:bg-green-200 cursor-pointer p-2 grid grid-cols-12 ${
                      index % 2 === 0 ? "bg-green-100" : "bg-green-50"
                    }`}
                  >
                    <div className="col-span-3">{customer.name}</div>
                    <div className="col-span-3">{customer.phone.mobile}</div>
                    <div className="col-span-6">{customer.address.main}</div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
