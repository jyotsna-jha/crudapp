import React, { useState } from "react";
import "./FormComponent.css";

const FormComponent = ({ setSubmittedData, submittedData }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    dob: "",
    address: {
      city: "",
      district: "",
      province: "1",
      country: "Nepal",
    },
    profilePicture: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      const file = e.target.files[0];
      if (file && file.type !== "image/png") {
        setErrors({ ...errors, profilePicture: "Only PNG images are allowed" });
      } else {
        setErrors({ ...errors, profilePicture: "" });
        setFormData({ ...formData, profilePicture: file });
      }
    } else if (name.startsWith("address.")) {
      const addressField = name.split(".")[1];
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [addressField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      validateField(name, value);
    }
  };

  const validateField = (fieldName, value) => {
    let fieldErrors = { ...errors };

    switch (fieldName) {
      case "name":
        fieldErrors.name = value.trim() ? "" : "Name is required";
        break;
      case "email":
        fieldErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ""
          : "Invalid email format";
        break;
      case "phoneNumber":
        fieldErrors.phoneNumber = /^\d{7,}$/.test(value)
          ? ""
          : "Phone number must be at least 7 digits";
        break;
      case "dob":
        fieldErrors.dob = value.trim() ? "" : "Date of Birth is required";
        break;
      default:
        break;
    }

    setErrors(fieldErrors);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();
    if (isValid) {
      setSubmittedData([...submittedData, formData]);
      setFormData({
        name: "",
        email: "",
        phoneNumber: "",
        dob: "",
        profilePicture: null,
        address: {
          city: "",
          district: "",
          province: "1",
          country: "Nepal",
        },
      });
      window.alert("Form submitted successfully!");
    }
  };

  const validateForm = () => {
    let formIsValid = true;
    let fieldErrors = {};

    Object.keys(formData).forEach((fieldName) => {
      const value = formData[fieldName];
      if (
        !value ||
        (typeof value === "object" &&
          !Object.values(value).every((val) => val.trim()))
      ) {
        fieldErrors[fieldName] = "This field is required";
        formIsValid = false;
      }
      validateField(fieldName, value);
    });

    setErrors(fieldErrors);
    return formIsValid;
  };

  return (
    <div>
      <h1 className="app-heading">React CrudApp</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <span className="error">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          {errors.phoneNumber && (
            <span className="error">{errors.phoneNumber}</span>
          )}
        </div>
        <div className="form-group">
          <label>DOB:</label>
          <input
            type="text"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="DD-MM-YY"
          />
          {errors.dob && <span className="error">{errors.dob}</span>}
        </div>
        <div className="form-group">
          <label>Profile Picture:</label>
          <input
            type="file"
            accept="image/png"
            name="profilePicture"
            onChange={handleChange}
          />
          {errors.profilePicture && (
            <span className="error">{errors.profilePicture}</span>
          )}
        </div>
        <div className="form-group">
          <label>Address:</label>
          <input
            type="text"
            name="address.city"
            value={formData.address.city}
            onChange={handleChange}
            placeholder="City"
          />
          <input
            type="text"
            name="address.district"
            value={formData.address.district}
            onChange={handleChange}
            placeholder="District"
          />
          <select
            name="address.province"
            value={formData.address.province}
            onChange={handleChange}
          >
            {[1, 2, 3, 4, 5, 6, 7].map((province) => (
              <option key={province} value={province}>
                Province {province}
              </option>
            ))}
          </select>
          <input
            type="text"
            name="address.country"
            value={formData.address.country}
            onChange={handleChange}
            placeholder="Country"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default FormComponent;
