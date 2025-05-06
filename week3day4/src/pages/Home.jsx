import { useState, useEffect } from "react";
import { saveUser } from "../utils/storage";
import { setCookie, getCookie } from "../utils/cookies";
import { v4 as uuidv4 } from "uuid";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [savedUser, setSavedUser] = useState(null);

  useEffect(() => {
    const cookieUser = getCookie("lastUser");
    if (cookieUser) {
      try {
        setSavedUser(JSON.parse(decodeURIComponent(cookieUser)));
      } catch (e) {
        console.error("Invalid cookie format",e);
      }
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = uuidv4();
    const timestamp = new Date().toISOString();

    const newUser = {
      id,
      firstName,
      lastName,
      timestamp,
    };

    saveUser(newUser); 
    setCookie("lastUser", JSON.stringify(newUser), 7); 
    setSavedUser(newUser); 

    setFirstName("");
    setLastName("");
    alert("User saved!");
    console.log("User saved:", newUser);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        <i className="fas fa-house text-blue-500 mr-2"></i>Home Page
      </h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white p-4 rounded shadow-sm border">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">First Name:</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Last Name:</label>
          <input
            className="w-full border px-3 py-2 rounded"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Doe"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition"
        >
          <i className="fas fa-save mr-2"></i>Save User
        </button>
      </form>
      <div>
        {savedUser && (
          <div className="mt-4 p-4 bg-gray-50 border rounded shadow-sm">
            <h2 className="text-lg font-bold text-gray-800 mb-2">Last Saved User:</h2>
            <p><strong>First Name:</strong> {savedUser.firstName}</p>
            <p><strong>Last Name:</strong> {savedUser.lastName}</p>
          </div>
        )}
      </div>
    </div>
  );
}
