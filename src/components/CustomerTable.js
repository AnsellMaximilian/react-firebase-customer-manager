import React, { useMemo } from "react";
import { useTable, useSortBy } from "react-table";

const customers = [
  {
    name: "Adriani",
    address: "Jl. Fambol, Congpa La, Tangerang",
    phone: "08776464623",
    region: "Jakarta Barat",
  },
  {
    name: "Marinee",
    address: "Jl. Fambol, Congpa La, Tangerang",
    phone: "08776464623",
    region: "Jakarta Barat",
  },
  {
    name: "Zaquelin",
    address: "Jl. Fambol, Congpa La, Tangerang",
    phone: "08776464623",
    region: "Jakarta Barat",
  },
];

export const CustomerTable = () => {
  const data = useMemo(() => customers, []);
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
  const tableInstance = useTable({ columns, data }, useSortBy);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;
  return (
    // apply the table props
    <table
      {...getTableProps()}
      className="border border-collapse border-green-700 w-full"
    >
      <thead className="bg-green-700 text-white font-bold">
        {
          // Loop over the header rows
          headerGroups.map((headerGroup) => (
            // Apply the header row props
            <tr {...headerGroup.getHeaderGroupProps()}>
              {
                // Loop over the headers in each row
                headerGroup.headers.map((column) => (
                  // Apply the header cell props
                  <th
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                    className="border border-green-700"
                  >
                    {
                      // Render the header
                      column.render("Header")
                    }
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </th>
                ))
              }
            </tr>
          ))
        }
      </thead>
      {/* Apply the table body props */}
      <tbody {...getTableBodyProps()}>
        {
          // Loop over the table rows
          rows.map((row, index) => {
            // Prepare the row for display
            prepareRow(row);
            return (
              // Apply the row props
              <tr
                {...row.getRowProps()}
                className={`hover:bg-green-200 cursor-pointer ${
                  index % 2 === 0 ? "bg-green-100" : "bg-green-50"
                }`}
              >
                {
                  // Loop over the rows cells
                  row.cells.map((cell, index) => {
                    // Apply the cell props
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={`border border-green-700 `}
                      >
                        {
                          // Render the cell contents
                          cell.render("Cell")
                        }
                      </td>
                    );
                  })
                }
              </tr>
            );
          })
        }
      </tbody>
    </table>
  );
};
