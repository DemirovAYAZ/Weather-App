import React from 'react';

const StatBox = ({ label, value }) => (
  <div className="bg-gray-700 p-3 rounded-lg text-center w-28">
    <p className="text-lg font-semibold">{value}</p>
    <p className="text-sm text-gray-300">{label}</p>
  </div>
);

export default StatBox;
