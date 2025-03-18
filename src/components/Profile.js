import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchUserProfile();
    }
  }, [token, navigate]);

  const fetchUserProfile = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/users/me", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(response.data);
      setName(response.data.name);
      setHobbies(response.data.hobbies);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("hobbies", JSON.stringify(hobbies));
    if (profilePhoto) formData.append("profilePhoto", profilePhoto);

    try {
      await axios.put("http://localhost:5000/api/users/me", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      alert("Profile updated successfully!");
      fetchUserProfile();
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete your account?")) {
      try {
        await axios.delete("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Account deleted!");
        navigate("/signup");
      } catch (error) {
        console.error("Error deleting account:", error);
      }
    }
  };

  return (
    <div className="p-6">
      {user ? (
        <div className="max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Your Profile</h2>
          <form onSubmit={handleUpdate} className="flex flex-col gap-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="p-2 border rounded"
            />
            <input type="file" onChange={(e) => setProfilePhoto(e.target.files[0])} accept="image/*" className="p-2 border rounded" />
            <fieldset>
              <legend>Select Hobbies:</legend>
              <label>
                <input
                  type="checkbox"
                  value="Reading"
                  checked={hobbies.includes("Reading")}
                  onChange={(e) =>
                    setHobbies((prev) =>
                      e.target.checked ? [...prev, "Reading"] : prev.filter((h) => h !== "Reading")
                    )
                  }
                />
                Reading
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Sports"
                  checked={hobbies.includes("Sports")}
                  onChange={(e) =>
                    setHobbies((prev) =>
                      e.target.checked ? [...prev, "Sports"] : prev.filter((h) => h !== "Sports")
                    )
                  }
                />
                Sports
              </label>
              <label>
                <input
                  type="checkbox"
                  value="Music"
                  checked={hobbies.includes("Music")}
                  onChange={(e) =>
                    setHobbies((prev) =>
                      e.target.checked ? [...prev, "Music"] : prev.filter((h) => h !== "Music")
                    )
                  }
                />
                Music
              </label>
            </fieldset>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
              Update Profile
            </button>
          </form>
          <button onClick={handleDelete} className="bg-red-500 text-white p-2 rounded mt-4">
            Delete Account
          </button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;

