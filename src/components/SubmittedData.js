import React, { useState } from 'react';
import './SubmittedData.css';

const SubmittedData = ({ data, onDelete, onEdit }) => {
  const [editedIndex, setEditedIndex] = useState(null);
  const [editedName, setEditedName] = useState('');

  const handleEdit = (index) => {
    setEditedIndex(index);
    setEditedName(data[index].name);
  };

  const handleSave = () => {
    const newData = [...data];
    newData[editedIndex].name = editedName;
    onEdit(newData);
    setEditedIndex(null);
    setEditedName('');
  };

  const handleCancelEdit = () => {
    setEditedIndex(null);
    setEditedName('');
  };

  return (
    <div className="table-container">
      <h2 className="heading">Submitted Data</h2> 
      <table className="data-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>DOB</th>
            <th>Address</th>
            <th>Profile Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((dataItem, index) => (
            <tr key={index} className="data-row">
              <td>
                {editedIndex === index ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  dataItem.name
                )}
              </td>
              <td>{dataItem.email}</td>
              <td>{dataItem.phoneNumber}</td>
              <td>{dataItem.dob}</td>
              <td>{`${dataItem.address.city}, ${dataItem.address.district}, ${dataItem.address.province}, ${dataItem.address.country}`}</td>
              <td>
                {dataItem.profilePicture && (
                  <img
                    src={URL.createObjectURL(dataItem.profilePicture)}
                    alt="Profile"
                    className="profile-image"
                  />
                )}
              </td>
              <td className="action-buttons">
                {editedIndex === index ? (
                  <>
                    <button className='save-button' onClick={handleSave}>Save</button>
                    <button className='.cancel-button' onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className='edit-button' onClick={() => handleEdit(index)}>Edit</button>
                    <button className='delete-button' onClick={() => onDelete(index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmittedData;
