import React from "react";

export const CustomerList = ({ customers, regions }) => {
  //   console.log(customers);
  return (
    <div>
      <div className="rounded-md shadow-md">
        {regions.map((region) => (
          <div key={region.id}>
            <div className="bg-green-700 text-white p-2 font-bold">
              {region.name}
            </div>
            <div>
              {customers
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
