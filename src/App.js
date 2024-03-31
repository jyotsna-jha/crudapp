import React from "react";
import { useState } from "react";
import FormComponent from "./components/FormComponent";
import SubmittedData from "./components/SubmittedData";



const Homepage = () => {
  const [submittedData, setSubmittedData] = useState([]);

  const handleDelete = (index) => {
    const newData = [...submittedData];
    newData.splice(index, 1);
    setSubmittedData(newData);
  };

  const handleEdit = (index) => {
    // Your edit logic goes here
  };

  return (
    <div>
      <FormComponent setSubmittedData={setSubmittedData} submittedData={submittedData} />
      <SubmittedData data={submittedData} onDelete={handleDelete} onEdit={handleEdit} />

    </div>
  );
};

export default Homepage;