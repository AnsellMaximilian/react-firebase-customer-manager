import React from "react";

const Form = ({
  customerName,
  nicknames,
  customerRegion,
  address,
  phoneNumber,
  regions,
  nickname,
  setCustomerName,
  setCustomerRegion,
  setNickname,
  setAddress,
  setPhoneNumber,
  deleteNickname,
  addNickname,
}) => {
  return (
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

      <div>
        <h3 className="text-lg font-semibold">Nicknames</h3>
        <form className="flex gap-2 mb-2" onSubmit={addNickname}>
          <input
            placeholder="Customer Name"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
            className="rounded-md border-gray-300 border p-1 ring-primary focus:ring-1 outline-none"
          />
          <button className="btn-secondary">Add</button>
        </form>
        <div className="flex gap-2">
          {nicknames.map((nickname, index) => (
            <div
              className="flex gap-1 shadow-md rounded-full border border-gray-200 px-2"
              key={index}
            >
              <div>{nickname}</div>
              <button onClick={() => deleteNickname(index)}>&times;</button>
            </div>
          ))}
        </div>
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
  );
};

export default Form;
