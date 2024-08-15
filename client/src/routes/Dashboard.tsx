import React, { useEffect, useState } from "react";
import { deleteUser } from "../api/deleteUser";
import { getUsers } from "../api/getUsers";

export default function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const newUsers = await getUsers();
      setUsers(newUsers);
    };

    fetchUsers();
  }, []);

  const handleDeletion = async (userId: string) => {
    await deleteUser(userId);
    //Optimistic update
    setUsers(users.filter((user) => user._id !== userId));
  };
  return (
    <div>
      {users.map((user) => (
        <li key={user._id} className="text-white">
          {user.email}
          <button onClick={() => handleDeletion(user._id)}>X</button>
        </li>
      ))}
    </div>
  );
}
