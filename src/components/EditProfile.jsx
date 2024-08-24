import React, { useState, useEffect } from "react";
import { Button } from "./Button";

export function EditProfile() {
  // Retrieve user data from localStorage and parse it
  const storedUserData = JSON.parse(localStorage.getItem("user_nt1")) || {};

  // Initialize state with stored data or default empty values
  const [formData, setFormData] = useState({
    firstname: storedUserData.firstname || "",
    lastname: storedUserData.lastname || "",
    username: storedUserData.username || "",
    email: storedUserData.email || "",
    city: storedUserData.informations.city || "",
    country: storedUserData.informations.country || "",
    address: storedUserData.informations.address || "",
    postalCode: storedUserData.informations.postalCode || "",
    phone: storedUserData.informations.phone || "",
    avatar: null,
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [avatarPreview, setAvatarPreview] = useState(
    storedUserData.avatar
      ? URL.createObjectURL(storedUserData.avatar)
      : "/uploads/default-avatar.png"
  );

  useEffect(() => {
    // Set avatar preview from localStorage if exists
    if (storedUserData.avatar) {
      setAvatarPreview(URL.createObjectURL(storedUserData.avatar));
    }
  }, [storedUserData.avatar]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        avatar: file,
      }));
      setAvatarPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement form submission logic here
  };

  return (
    <div className="edit-container">
      <div className="edit-profile">
        <p className="title">Edit Profile</p>

        <form className="form" onSubmit={handleSubmit}>
          <p className="edit-label">* Required field</p>
          <div className="form-columns">
            <div className="avatar-column">
              <div className="avatar-input">
                {/* Display the avatar preview or default avatar */}
                <img
                  src={avatarPreview}
                  alt="Avatar preview"
                  className="avatar-preview"
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  id="avatar-upload"
                  style={{ display: "none" }}
                />
                <label htmlFor="avatar-upload" className="avatar-label">
                  Change Avatar
                </label>
                <button type="submit" className="form-btn">
                  Edit Profile
                </button>
              </div>
            </div>
            <div className="form-column">
              <input
                type="text"
                className="input"
                placeholder="Firstname*"
                name="firstname"
                value={formData.firstname}
                onChange={handleChange}
              />
              <input
                type="text"
                className="input"
                placeholder="Lastname*"
                name="lastname"
                value={formData.lastname}
                onChange={handleChange}
              />
              <input
                type="text"
                className="input"
                placeholder="Username*"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
              <input
                type="email"
                className="input"
                placeholder="Email*"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />

              <input
                type="text"
                className="input"
                placeholder="City*"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <input
                type="text"
                className="input"
                placeholder="Country*"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
              <input
                type="text"
                className="input"
                placeholder="Address*"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
              <input
                type="text"
                className="input"
                placeholder="Postal Code*"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
              <input
                type="tel"
                className="input"
                placeholder="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
}
