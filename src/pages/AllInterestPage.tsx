import { useEffect, useState } from "react";
import InterestsCard from "../components/InterestsCard";
import Navbar from "../components/Navbar";
import interestsData from "../data/interests.json";

export default function AllInterestPage() {
  const [interests, setInterests] = useState<any>([]);

  useEffect(() => {
    const storedInterests = localStorage.getItem("interests");

    if (storedInterests) {
      setInterests(JSON.parse(storedInterests));
    } else {
      setInterests(interestsData);
      localStorage.setItem("interests", JSON.stringify(interestsData));
    }
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center">
        <h1 className="text-4xl my-4 text-purple-950">
          These are all the interests that are available in the application
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {interests.map((data: any, index: number) => (
            <InterestsCard
              key={index}
              title={data.title}
              description={data.description}
              image={data.image}
              url={data.url}
            />
          ))}
        </div>
      </div>
    </>
  );
}
