import { useState, useEffect } from "react";
import { faker } from "@faker-js/faker";
import Suggestion from "./Suggestion";

function Suggestions() {
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(5)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
      worksAt: faker.company.bs(),
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className="mt-4 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See all</button>
      </div>

      {suggestions.map((profile) => (
        <Suggestion
          key={profile.userId}
          userImg={profile.avatar}
          username={profile.username}
          worksAt={profile.worksAt}
        />
      ))}
    </div>
  );
}

export default Suggestions;
