const UserList = ({ user }) => {
  return (
    <div className="user-list">
      <h4>
        {user.FirstName} {user.LastName}
      </h4>
      <p>
        <strong>Username: {user.Username}</strong>
      </p>
      <p>
        <strong>Password: {user.Password}</strong>
      </p>
      <p>
        <strong>{user.createdAt}</strong>
      </p>
    </div>
  );
};

export default UserList;
