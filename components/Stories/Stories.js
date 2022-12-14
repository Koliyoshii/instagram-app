import { faker } from "@faker-js/faker";
import { useEffect, useState } from "react";
import Story from "./Story";
import { useSession } from "next-auth/react";

function Stories() {
  const { data:session } = useSession();
  const [suggestions, setSuggestions] = useState([]);
  useEffect(() => {
    const suggestions = [...Array(20)].map((_, i) => ({
      userId: faker.datatype.uuid(),
      username: faker.internet.userName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
      password: faker.internet.password(),
      birthdate: faker.date.birthdate(),
      registeredAt: faker.date.past(),
    }));
    setSuggestions(suggestions);
  }, []);

  return (
    <div className="flex space-x-2 p-6 bg-white mt-8 border-gray-200 border rounded-sm overflow-x-scroll scrollbar-thin scrollbar-thumb-black scrollbar-rounded-full">
      {session && (
        <Story img={session.user.image} username={session.user.username} />
      )}
      {!session && (
        <Story img={"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png"} username={"Username"} />
      )}
      
      
      {suggestions.map((profile) => {
        return (
          <Story
            key={profile.userId}
            img={profile.avatar}
            username={profile.username}
          />
        );
      })}
    </div>
  );
}

export default Stories;
