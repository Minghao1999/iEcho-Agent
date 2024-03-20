const FriendProfile = () => {
  const user = {
    name: "Friend profile",
    status: "Offline",
    number: "+198736425",
    profilePictureUrl: "https://via.placeholder.com/150", // Replace this URL with your actual profile picture URL
  };
  return (
    <main className="profile-container">
      <div className="profile-header">
        <img
          src={user.profilePictureUrl}
          className="profile-picture"
          alt="Profile"
        />
        <div className="profile-info">
          <div className="user-name">{user.name}</div>
          <div className="user-status">{user.status}</div>
          <div className="user-number">{user.number}</div>
        </div>
      </div>
    </main>
  );
};

export default FriendProfile;
