import React, { useMemo, useState } from "react";
import { useTable, useSortBy, useGlobalFilter } from "react-table";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export const CustomerTable = ({ customers }) => {
  const [globalFilterInput, setGlobalFilterInput] = useState("");
  const data = useMemo(
    () =>
      customers.map((customer) => ({
        name: customer.name,
        address: customer.address.main,
        phone: customer.phone.mobile,
        region: customer.region,
      })),
    [customers]
  );
  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Phone",
        accessor: "phone",
      },
      {
        Header: "Address",
        accessor: "address",
      },
      {
        Header: "Region",
        accessor: "region",
      },
    ],
    []
  );
  const tableInstance = useTable({ columns, data }, useGlobalFilter, useSortBy);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setGlobalFilter,
  } = tableInstance;
  return (
    <div>
      <input
        value={globalFilterInput}
        onChange={(e) => {
          const value = e.target.value;

          setGlobalFilterInput(value);
          setGlobalFilter(value);
        }}
        placeholder="Global Filter"
      />
      <table
        {...getTableProps()}
        className="border border-collapse w-full rounded-md shadow-md"
      >
        <thead className="bg-green-700 text-white font-bold">
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className="p-2 hover:bg-green-800"
                >
                  <span className="flex items-center justify-center">
                    {column.render("Header")}
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <FaChevronDown className="ml-2 inline-block align-middle" />
                      ) : (
                        <FaChevronUp className="ml-2 inline-block" />
                      )
                    ) : (
                      ""
                    )}
                  </span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                {...row.getRowProps()}
                className={`hover:bg-green-200 cursor-pointer ${
                  index % 2 === 0 ? "bg-green-100" : "bg-green-50"
                }`}
              >
                {row.cells.map((cell, index) => {
                  return (
                    <td {...cell.getCellProps()} className={`p-2`}>
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
