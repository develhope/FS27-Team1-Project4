import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { imageDomain } from "../custom-hooks/usePostImage";

export function UserProfile() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const openDeleteModal = () => {
    setShowDeleteModal(true);
    setIsMenuOpen(false);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
  };

  const getAvatarSrc = () => {
    return user?.avatarUrl ? user.avatarUrl : "/uploads/default-avatar.png";
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user_nt1");
    if (storedUser) {
      setUser(JSON.parse(storedUser, storedUser.information));
    }
  }, []);

  const handleDeleteAccountSoft = async () => {
    try {
      await fetch("http://localhost:3000/api/user/soft/" + user.id, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      localStorage.removeItem("user_nt1");

      navigate("/login");
    } catch (error) {
      console.error("Error deleting account:", error);
    } finally {
      closeDeleteModal();
    }
  };
  return (
    <div className="user-container">
      <div className="user-profile">
        <h2 className="title">User Profile {user?.username}</h2>
        <div className="user-columns">
          <div className="avatar-column">
            <img
              src={
                user?.avatarUrl
                  ? imageDomain + user?.avatarUrl
                  : "uploads/default-avatar.png"
              }
              alt="User Avatar"
              className="avatar-preview"
            />
          </div>
          <div className="details-column">
            <div className="menu-container">
              <button className="menu-button" onClick={toggleMenu}>
                ⋮
              </button>
              {isMenuOpen && (
                <div className="dropdown-menu">
                  <Link to="/edit-profile">
                    <button>Edit profile</button>
                  </Link>
                  <Link to="/edit-password">
                    <button>Edit password</button>
                  </Link>
                  <button onClick={openDeleteModal}>Delete profile</button>
                </div>
              )}
            </div>
            <div className="user-detail">
              <label>Firstname:</label>
              <p>{user?.firstname || "N/A"}</p>
            </div>
            <div className="user-detail">
              <label>Lastname:</label>
              <p>{user?.lastname || "N/A"}</p>
            </div>
            <div className="user-detail">
              <label>Birthdate:</label>
              <p>{user?.informations.birthdate || "N/A"}</p>
            </div>
            <div className="user-detail">
              <label>Email:</label>
              <p>{user?.email || "N/A"}</p>
            </div>
            <div className="user-detail">
              <label>Phone:</label>
              <p>{user?.informations.phone || "N/A"}</p>
            </div>
            <div className="user-detail">
              <label>City:</label>
              <p>{user?.informations.city || "N/A"}</p>
            </div>
            <div className="user-detail">
              <label>Country:</label>
              <p>{user?.informations.country || "N/A"}</p>
            </div>
          </div>
        </div>
      </div>
      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <h3>Are you sure you want to delete your account?</h3>
            <div className="modal-buttons">
              <button onClick={closeDeleteModal}>Cancel</button>
              <button onClick={handleDeleteAccountSoft}>
              Yes, confirm delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
