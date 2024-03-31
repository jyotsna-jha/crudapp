import React, { useState } from 'react';
import './SubmittedData.css';

const SubmittedData = ({ data, onDelete, onEdit }) => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

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
              <td>{dataItem.name}</td>
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
                <button className="edit-button" onClick={() => onEdit(indexOfFirstItem + index)}>Edit</button>
                <button className="delete-button" onClick={() => onDelete(indexOfFirstItem + index)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {totalPages > 1 && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, i) => (
            <span
              key={i}
              className={`page-number ${currentPage === i + 1 ? 'active' : ''}`}
              onClick={() => changePage(i + 1)}
            >
              {i + 1}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubmittedData;

