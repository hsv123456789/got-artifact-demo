import Navbar from "../components/Navbar";
import { useLocation } from "react-router-dom";
import interests from "../data/interests.json";

export default function InterestPage() {
  const location = useLocation();
  let subUrl = location.pathname.split("/interest/")[1];

  const interest = interests.find(
    (item) => item.title.toLowerCase() === subUrl.toLowerCase()
  );

  if (!interest) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <h1 className="text-2xl font-bold text-red-500">
            Enter a valid interest, the given interest does not exist.
          </h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center items-center min-h-screen bg-purple-100">
        <div className="bg-purple-50 shadow-lg rounded-lg overflow-hidden max-w-sm">
          <img
            className="w-full h-64 object-cover"
            src={`/assets/${interest.image}.jpeg`}
            alt={interest.title}
          />
          <div className="p-6">
            <h2 className="font-bold text-2xl text-gray-800 mb-2">
              {interest.title}
            </h2>
            <p className="text-gray-600 text-base mb-4">
              {interest.description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
