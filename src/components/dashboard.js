import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchUsers();
    }
  }, [token, navigate]);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">User Dashboard</h2>
        <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded">
          Logout
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {users.map((user) => (
          <div key={user._id} className="border p-4 rounded-lg">
            <img src={user.profilePhoto} alt={user.name} className="w-20 h-20 rounded-full mx-auto" />
            <h3 className="text-lg font-semibold">{user.name}</h3>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-sm">Hobbies: {user.hobbies.join(", ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
