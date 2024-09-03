import { useEffect, useState } from "react";
import { deleteUser } from "../api/deleteUser";
import { getUsers } from "../api/getUsers";

// Define the User type
interface User {
  _id: string;
  email: string;
}

export default function Dashboard() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const newUsers: User[] = await getUsers();
      setUsers(newUsers);
    };

    fetchUsers();
  }, []);

  const handleDeletion = async (userId: string) => {
    await deleteUser(userId);
    // Optimistic update
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
