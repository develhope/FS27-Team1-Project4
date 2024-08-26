export function ContainerUserProfile (user) {

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