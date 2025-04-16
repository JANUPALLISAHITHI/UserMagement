import { useEffect, useState } from "react";
import axios from "axios";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({ name: "", email: "", age: "" });
  const [editingUser, setEditingUser] = useState(null);
  const [isAdding, setIsAdding] = useState(false); // State to toggle form visibility

  // Fetch all users when component mounts
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3001/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleAddUser = async () => {
    if (!newUser.name || !newUser.email || !newUser.age) {
      console.error("Please fill out all fields.");
      return; // Prevent form submission if any field is empty
    }

    try {
      console.log("Adding new user:", newUser); // Debugging line to see what data is being sent
      await axios.post("http://localhost:3001/users", newUser);
      fetchUsers(); // Refresh user list
      setNewUser({ name: "", email: "", age: "" }); // Clear form fields after submission
      setIsAdding(false); // Hide form after adding
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/users/${id}`);
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`http://localhost:3001/users/${editingUser._id}`, editingUser);
      setEditingUser(null);
      fetchUsers();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsAdding(false); // Hide add user form when editing
  };

  return (
    <div className="p-5">
      <h2 className="text-xl font-bold mb-4 bg-red-400 text-center">User Management</h2>

      {/* Add User Button (Center aligned) */}
      {!isAdding && (
        <div className="flex justify-center mb-4">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-full text-xl"
            onClick={() => setIsAdding(true)} // Show the add user form
          >
            Add User
          </button>
        </div>
      )}

      {/* Add/Edit User Form */}
      {isAdding || editingUser ? (
        <div className="mb-4 flex flex-col gap-2">
          <input
            className="border p-2 rounded"
            type="text"
            placeholder="Name"
            value={editingUser ? editingUser.name : newUser.name}
            onChange={(e) =>
              editingUser
                ? setEditingUser({ ...editingUser, name: e.target.value })
                : setNewUser({ ...newUser, name: e.target.value })
            }
          />
          <input
            className="border p-2 rounded"
            type="email"
            placeholder="Email"
            value={editingUser ? editingUser.email : newUser.email}
            onChange={(e) =>
              editingUser
                ? setEditingUser({ ...editingUser, email: e.target.value })
                : setNewUser({ ...newUser, email: e.target.value })
            }
          />
          <input
            className="border p-2 rounded"
            type="number"
            placeholder="Age"
            value={editingUser ? editingUser.age : newUser.age}
            onChange={(e) =>
              editingUser
                ? setEditingUser({ ...editingUser, age: e.target.value })
                : setNewUser({ ...newUser, age: e.target.value })
            }
          />
          {editingUser ? (
            <button
              className="bg-green-500 text-white px-3 py-2 rounded"
              onClick={handleUpdateUser}
            >
              Update User
            </button>
          ) : (
            <button
              className="bg-blue-500 text-white px-3 py-2 rounded"
              onClick={handleAddUser}
            >
              Add User
            </button>
          )}
        </div>
      ) : null}

      {/* User List in Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user._id} className="border p-4 rounded shadow">
            <h3 className="font-bold">{user.name}</h3>
            <p>{user.email}</p>
            <p>Age: {user.age}</p>
            <div className="mt-2">
              <button
                className="bg-red-500 text-white px-2 py-1 rounded mr-2"
                onClick={() => handleDeleteUser(user._id)}
              >
                Delete
              </button>
              <button
                className="bg-yellow-500 text-white px-2 py-1 rounded"
                onClick={() => handleEditUser(user)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserManagement;


