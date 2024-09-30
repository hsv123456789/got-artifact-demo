import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import storedData from "./data/userDetails.json";
export default function App() {
  const sampleResponse = {
    success: true,
    profile: {
      user_uuid: "aa2a7a42-82a7-4350-b23f-57c74445964d",
      email: "npm@gmail.com",
      username: "jaytest",
      display_name: "jaytest",
      location: "",
      biography: "",
      avatar_uri:
        "https://firebasestorage.googleapis.com/v0/b/adtest-96abe.appspot.com/o/images%2Fjaytest%2F4475da4a-7526-4c34-88fb-05712576b738.png?alt=media&token=a29930c9-d8a7-448d-a952-4791b282a368",
      banner_uri: "/images/content/profile/default_banner.png",
      badge: "",
      socials: null,
      created_at: "2024-01-18T01:08:19+0000",
    },
  };
  const [profile, setProfile] = useState(sampleResponse.profile);
  const [isEditing, setIsEditing] = useState(false);
  const [editableData, setEditableData] = useState<any>(profile);
  const [bearerToken, setBearerToken] = useState("");

  useEffect(() => {
    const storedToken = localStorage.getItem("bearerToken");

    if (storedToken) {
      setBearerToken(storedToken);
    } else {
      const token =
        "eyJhbGciOiJSUzI1NiIsImtpZCI6IjdjZjdmODcyNzA5MWU0Yzc3YWE5OTVkYjYwNzQzYjdkZDJiYjcwYjUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vYWR0ZXN0LTk2YWJlIiwiYXVkIjoiYWR0ZXN0LTk2YWJlIiwiYXV0aF90aW1lIjoxNzA1NjA2NDE1LCJ1c2VyX2lkIjoiczFINTJ6OTNFcmJPaGV0SGhIMEE3ZUxCOElqMiIsInN1YiI6InMxSDUyejkzRXJiT2hldEhoSDBBN2VMQjhJajIiLCJpYXQiOjE3MDU2MDY0MTUsImV4cCI6MTcwNTYxMDAxNSwiZW1haWwiOiJucG1AZ21haWwuY29tIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbIm5wbUBnbWFpbC5jb20iXX0sInNpZ25faW5fcHJvdmlkZXIiOiJwYXNzd29yZCJ9fQ.jT9vIRl9yLgOcEvGfenfTygx1bOG4DYvhgJkbXFabQ6soDjlWRVUW2yWN_BmRlwMN8zoG04EMNrDKA18EB_5fFFjnKfl5VryibI4R3_K6afXYLQr-35EzVuU1LtjgmwAQ3xIQA1nkW58KVIE7mJiI9XS3lZjTGJ66XLyZHmOsvqreZiU32p6LxoujGRmLnl2Ha8Kwkb9CM_uOzPNkgQiPQG5wDnn_P9BJUx0DGljdA60D3_2JPuMuFYBMlD7o1SnVMKdomqlF2NeQf9wysp5uUklAfBblPURLf0bZ0Ohi7nGKr6iQUvq8rUjFdCSfcGuRmWFWDUj_yE0vVeXenZa5A";

      localStorage.setItem("bearerToken", token);
      setBearerToken(token);
    }

    const fetchUserData = async () => {
      try {
        if (!bearerToken) return;

        const response = await axios.get(
          "https://api-staging-0.gotartifact.com/v2/users/me",
          {
            headers: {
              Authorization: `Bearer ${bearerToken}`,
            },
          }
        );
        console.log(response);
        const userData = response.data.profile;
        console.log(userData);
        setProfile(userData);
        setEditableData(userData);

        localStorage.setItem("userDetails", JSON.stringify(userData));
      } catch (error) {
        localStorage.setItem(
          "userDetails",
          JSON.stringify(sampleResponse.profile)
        );
      }
    };

    const fetchLocation = async () => {
      try {
        const response = await axios.get(
          "https://ipgeolocation.abstractapi.com/v1/?api_key=f556b5bd043b4942a942dcda5c39ea74"
        );
        const location = response.data.city + ", " + response.data.country;
        setEditableData((prevData: any) => ({
          ...prevData,
          location: location,
        }));
      } catch (error) {
        console.error("Error fetching location:", error);
      }
    };

    fetchLocation();
    fetchUserData();
  }, [bearerToken]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setEditableData({
      ...editableData,
      [name]: value,
    });
  };

  const handleSave = () => {
    setProfile(editableData);
    setIsEditing(false);

    localStorage.setItem("userDetails", JSON.stringify(editableData));
  };

  return (
    <>
      <Navbar />
      <div className="container mx-auto flex flex-col items-center mt-8">
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6">
          <div className="flex flex-col items-center">
            <img
              className="w-32 h-32 rounded-full object-cover"
              src={profile.avatar_uri}
              alt={editableData.display_name}
            />
            <h1 className="text-2xl font-bold mt-4">
              {editableData.display_name}
            </h1>
          </div>

          <div className="mt-6">
            <div className="mb-4">
              <label className="block text-gray-600">Name</label>
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editableData.username}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              ) : (
                <p>{profile.username}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Age</label>
              {isEditing ? (
                <input
                  type="number"
                  name="age"
                  value={editableData.age}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              ) : (
                <p>{storedData.age}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Gender</label>
              {isEditing ? (
                <input
                  type="text"
                  name="gender"
                  value={editableData.gender}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              ) : (
                <p>{storedData.gender}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Location</label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={editableData.location}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              ) : (
                <p>{profile.location}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Interest 1</label>
              {isEditing ? (
                <input
                  type="text"
                  name="interest1"
                  value={editableData.interest1}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              ) : (
                <p>{storedData.interest1}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-600">Interest 2</label>
              {isEditing ? (
                <input
                  type="text"
                  name="interest2"
                  value={editableData.interest2}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              ) : (
                <p>{storedData.interest2}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Email</label>
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={editableData.email}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              ) : (
                <p>{profile.email}</p>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-gray-600">Username</label>
              {isEditing ? (
                <input
                  type="text"
                  name="username"
                  value={editableData.username}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              ) : (
                <p>{profile.username}</p>
              )}
            </div>

            <div className="flex justify-between mt-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="bg-purple-800 text-white px-4 py-2 rounded-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-violet-500 text-white px-4 py-2 rounded-md"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={handleEditToggle}
                  className="bg-purple-800 text-white px-4 py-2 rounded-md"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
