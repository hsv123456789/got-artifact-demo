import { useNavigate } from "react-router-dom";

type Interest = {
  title: string;
  description: string;
  image: string;
  url: string;
};

export default function InterestsCard(singleInterests: Interest) {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/interest/${singleInterests.url}`);
  };

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer hover:shadow-2xl transition duration-300 bg-purple-50"
      onClick={handleNavigation}
    >
      <img
        className="w-full"
        src={`/assets/${singleInterests.image}.jpeg`}
        alt={singleInterests.title}
      />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-purple-900">
          {singleInterests.title}
        </div>
        <p className="text-purple-700 text-base">
          {singleInterests.description}
        </p>
      </div>
    </div>
  );
}
