import React from "react";

const Details = ({ customerName, nicknames, region, address, phoneNumber }) => {
  return (
    <div className="mb-4 flex flex-col gap-4 p-4">
      <div className="">
        <h3 className="text-lg font-semibold">Name</h3>
        <div>{customerName}</div>
      </div>
      {nicknames.length > 0 && (
        <div className="">
          <h3 className="text-lg font-semibold">Nicknames</h3>
          <div>
            {nicknames
              .map((nickname, index) =>
                index + 1 === nicknames.length ? nickname : `${nickname},`
              )
              .join(" ")}
          </div>
        </div>
      )}
      <div className="">
        <h3 className="text-lg font-semibold">Region</h3>
        <div>{region}</div>
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
  );
};

export default Details;
