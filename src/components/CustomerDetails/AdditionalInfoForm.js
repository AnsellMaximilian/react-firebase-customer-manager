import React from "react";

const AdditionalInfoForm = ({ additionalInfo, setAdditionalInfo }) => {
  return (
    <div className="p-4 border-t border-gray-200">
      <div className="text-2xl font-bold mb-4">Additional Information</div>
      <div className="flex flex-col gap-2">
        {Object.keys(additionalInfo).map((key) => (
          <div key={key} className="">
            <h4 className="text-xl font-semibold">{key}</h4>
            <div>{additionalInfo[key]}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdditionalInfoForm;
