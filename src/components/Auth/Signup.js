import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hobbies, setHobbies] = useState([]);
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("profilePhoto", profilePhoto);
    formData.append("hobbies", JSON.stringify(hobbies));

    try {
      await axios.post("http://localhost:5000/api/auth/signup", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed!");
    }
  };

  const handleHobbyChange = (e) => {
    const { value, checked } = e.target;
    setHobbies((prev) =>
      checked ? [...prev, value] : prev.filter((hobby) => hobby !== value)
    );
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">Signup</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form className="flex flex-col gap-4 w-80" onSubmit={handleSignup}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="p-2 border rounded"
        />
        <label>Profile Photo:</label>
        <input
          type="file"
          onChange={(e) => setProfilePhoto(e.target.files[0])}
          accept="image/png, image/jpeg"
          required
          className="p-2 border rounded"
        />
        <fieldset>
          <legend>Select Hobbies:</legend>
          <label>
            <input type="checkbox" value="Reading" onChange={handleHobbyChange} /> Reading
          </label>
          <label>
            <input type="checkbox" value="Sports" onChange={handleHobbyChange} /> Sports
          </label>
          <label>
            <input type="checkbox" value="Music" onChange={handleHobbyChange} /> Music
          </label>
        </fieldset>
        <button type="submit" className="bg-green-500 text-white p-2 rounded">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;
