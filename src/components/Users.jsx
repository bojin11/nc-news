import { getUsers } from "./api";
import { useEffect, useState } from "react";
export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUsers().then((users) => {
      setUsers(users);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      {loading ? (
        <p className="loading">Loading users...</p>
      ) : (
        <div className="users">
          <div className="user-card-container">
            {users.map((user) => (
              <div key={user.username} className="user-card">
                <img src={user.avatar_url} alt="User" />
                <div className="username">{user.username}</div>
                <div className="name">Name: {user.name}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
