import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { imageDomain, usePostImage } from "../custom-hooks/usePostImage";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { FaTimes } from 'react-icons/fa';

export function EditProfile() {
  const storedUserData = JSON.parse(localStorage.getItem("user_nt1")) || {};
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstname: storedUserData.firstname,
    lastname: storedUserData.lastname,
    username: storedUserData.username,
    email: storedUserData.email,
    birthdate: storedUserData.informations.birthdate,
    city: storedUserData.informations.city,
    country: storedUserData.informations.country,
    address: storedUserData.informations.address,
    postalCode: storedUserData.informations.postalCode,
    phone: storedUserData.informations.phone,
    avatarUrl: storedUserData.avatarUrl,
  });

  const [image, setImage] = useState(formData.avatarUrl)
  const [onUploadImage, error] = usePostImage(setImage)
  const [errorMessage, setErrorMessage] = useState("");
  
  const handleArrowClick = () => {
    navigate("/user-profile");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value === "") {
      setFormData((prevData) => ({
        ...prevData,
        [name]: null,
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = () => {
    setImage(""); // Rimuove l'immagine impostando image a stringa vuota
    setFormData({...formData, avatarUrl: ""}); // Aggiorna anche formData
  };

  
  const handleFileChange = async (e) => {
  try { await onUploadImage(e.target.files[0])
   if(error) {
   throw new Error(error)
   }
  } catch(error){
    throw new Error(error)
  }
  };
 useEffect(() => {
setFormData({...formData, avatarUrl: image})
 }, [image])
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const response = await fetch(
        "http://localhost:3000/api/user/update/" + storedUserData.id,
        {
          method: "PUT",
          body: JSON.stringify(formData),
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(formData);
      
      if (!response.ok) {
        throw new Error(JSON.stringify(response));
      }

      const updateUserData = await response.json();

      localStorage.setItem("user_nt1", JSON.stringify(updateUserData.user));

      alert("Profile update successfully!");
      navigate("/user-profile")
    } catch (error) {
      console.error("Error updating profile:", error);
      setErrorMessage("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="edit-container">
      <div className="edit-profile">
      <button onClick={handleArrowClick} className="back-button">
  <span className="arrow-icon"><MdOutlineKeyboardBackspace /></span>
  <span className="back-text">Back</span>
</button>

        <p className="title">Edit Profile</p>

        <form className="form" onSubmit={handleSubmit}>
          <p className="edit-label">* Required field</p>
          <div className="form-columns">
            <div className="avatar-column">
            <div className="avatar-input">
          <div className="avatar-preview-container">
            <img
              src={image && image !== "" ? imageDomain + image : imageDomain + "uploads/default-avatar.png"}
              alt="Avatar preview"
              className="avatar-preview"
            />
            {image && image !== "" && (
              <button onClick={handleRemoveImage} className="remove-image-btn">
                <FaTimes />
              </button>
            )}
          </div>
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
                value={formData.firstname || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                className="input"
                placeholder="Lastname*"
                name="lastname"
                value={formData.lastname || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                className="input"
                placeholder="Username*"
                name="username"
                value={formData.username || ""}
                onChange={handleChange}
              />
              <input
                type="email"
                className="input"
                placeholder="Email*"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
              />

              <input
                type="date"
                className="input"
                placeholder="Birthday*"
                name="birthdate"
                value={formData.birthdate || ""}
                onChange={handleChange}
              />

              <input
                type="text"
                className="input"
                placeholder="City*"
                name="city"
                value={formData.city || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                className="input"
                placeholder="Country*"
                name="country"
                value={formData.country || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                className="input"
                placeholder="Address*"
                name="address"
                value={formData.address || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                className="input"
                placeholder="Postal Code*"
                name="postalCode"
                value={formData.postalCode || ""}
                onChange={handleChange}
              />
              <input
                type="text"
                className="input"
                placeholder="Phone"
                name="phone"
                value={formData.phone || ""}
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
