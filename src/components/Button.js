// SubmittedDataTablePage.js
import React from 'react';
import SubmittedData from './SubmittedData';

const SubmittedDataTablePage = ({ submittedData }) => {
  return (
    <div>
      <h1>Submitted Data Table</h1>
      <SubmittedData data={submittedData} />
    </div>
  );
};

export default SubmittedDataTablePage;
