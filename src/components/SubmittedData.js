import React, { useState } from 'react';
import './SubmittedData.css';

const SubmittedData = ({ data, onDelete, onEdit }) => {
  const [editedIndex, setEditedIndex] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const[editedPhone,setEditedPhone]=useState('');

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleEdit = (index) => {
    setEditedIndex(index);
    setEditedName(data[index].name);
    setEditedEmail(data[index].email); 
    setEditedPhone(data[index].phoneNumber);
  };

  const handleSave = () => {
    const newData = [...data];
    newData[editedIndex].name = editedName;
    newData[editedIndex].email = editedEmail; 
    newData[editedIndex].phoneNumber=editedPhone;
    onEdit(newData);
    setEditedIndex(null);
    setEditedName('');
    setEditedEmail('');
    setEditedPhone('');
  };

  const handleCancelEdit = () => {
    setEditedIndex(null);
    setEditedName('');
    setEditedPhone('');
    setEditedEmail('');
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const changePage = (page) => {
    setCurrentPage(page);
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
          {currentItems.map((dataItem, index) => (
            <tr key={index} className="data-row">
              <td>
                {editedIndex === indexOfFirstItem + index ? (
                  <input
                    type="text"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                  />
                ) : (
                  dataItem.name
                )}
              </td>
              <td>
  {editedIndex === indexOfFirstItem + index ? (
    <input
      type="email" 
      value={editedEmail} 
      onChange={(e) => setEditedEmail(e.target.value)} 
    />
  ) : (
    dataItem.email
  )}
</td>
 
                <td>
                {editedIndex === indexOfFirstItem + index ? (
                  <input
                    type="text"
                    value={editedPhone}
                    onChange={(e) => setEditedPhone(e.target.value)}
                  />
                ) : (
                  dataItem.phoneNumber
                )}
              </td>
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
                {editedIndex === indexOfFirstItem + index ? (
                  <>
                    <button className='save-button' onClick={handleSave}>Save</button>
                    <button className='cancel-button' onClick={handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className='edit-button' onClick={() => handleEdit(indexOfFirstItem + index)}>Edit</button>
                    <button className='delete-button' onClick={() => onDelete(indexOfFirstItem + index)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => changePage(i + 1)}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmittedData;
