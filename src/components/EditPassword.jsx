import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

export function EditPassword() {
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleArrowClick = () => {
    navigate("/user-profile");
  };

  const user = JSON.parse(localStorage.getItem("user_nt1"));
  console.log(user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    try {
      const verifyResponse = await fetch(
        "http://localhost:3000/api/user/check/" + user.id,
        {
          method: "POST",
          body: JSON.stringify({ password: oldPassword }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!verifyResponse.ok) {
        setErrorMessage("Old password is incorrect.");
        return;
      }

      if (newPassword !== confirmNewPassword) {
        setErrorMessage("New passwords do not match.");
        return;
      }

      const updateResponse = await fetch(
        "http://localhost:3000/api/user/update/password/" + user.id,
        {
          method: "PUT",
          body: JSON.stringify({ password: newPassword }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!updateResponse.ok) {
        throw new Error("Failed to update password.");
      }

      const updateJson = await updateResponse.json();

      localStorage.setItem("user_nt1", JSON.stringify(updateJson.user));

      alert("Password updated successfully!");
      navigate("/user-profile");
    } catch (error) {
      console.error("Error updating password:", error);
      setErrorMessage(error.message);
    }
  };
  

  return (
    <div className="edit-container-password">
      <div className="edit-profile">
        <button onClick={handleArrowClick} className="back-button">
          <span className="arrow-icon">
            <MdOutlineKeyboardBackspace />
          </span>
          <span className="back-text">Back</span>
        </button>

        <p className="title">Change Password</p>

        <form className="form" onSubmit={handleSubmit}>
          <p className="edit-label">* Required field</p>
          <div className="form-column">
            <input
              type="password"
              className="input"
              placeholder="Old Password*"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="input"
              placeholder="New Password*"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
            <input
              type="password"
              className="input"
              placeholder="Confirm New Password*"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              required
            />
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="buttons-container">
            <button type="submit" className="form-btn">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
