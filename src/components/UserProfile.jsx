import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { imageDomain } from "../custom-hooks/usePostImage";
export function UserProfile() {
  const [user, setUser] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
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

  console.log(user);

  return (
    <div className="user-container">
      <div className="user-profile">
        <h2 className="title">User Profile {user?.username}</h2>
        <div className="user-columns">
          <div className="avatar-column">
            <img
              src={user?.avatarUrl ? imageDomain + user?.avatarUrl :"uploads/default-avatar.png"}
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
                  <button>Delete profile</button>
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
    </div>
  );
}
