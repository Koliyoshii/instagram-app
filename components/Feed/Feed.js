import Stories from "../Stories/Stories";
import Posts from "../Posts/Posts";
import MiniProfile from "../MiniProfile/MiniProfile";
import Suggestions from "../Suggestions/Suggestions";
import { useSession } from "next-auth/react";

function Feed() {
  const { data: session } = useSession();

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 md:max-w-3xl xl:grid-cols-3 xl:max-w-6xl mx-auto">
      {/* Section left */}
      <section className="col-span-2">
        {/* Stories */}
        <Stories />
        {/* Posts */}
        <Posts />
      </section>

      {session && (
        <>
          {/* Section right */}
          <section className="hidden xl:inline-grid md:col-span-1">
            <div className="fixed top-20">
              {/* Mini profile */}
              <MiniProfile />
              {/* Suggestions */}
              <Suggestions />
            </div>
          </section>
        </>
      )}
      {!session && (
        <>
          {/* Section right */}
          <section className="hidden xl:inline-grid md:col-span-1">
            <div className="fixed top-20">
              <p className="mt-5 ml-10">You are not logged in. This is dummy data:</p>
              {/* Mini profile */}
              <MiniProfile />
              {/* Suggestions */}
              <Suggestions />
            </div>
          </section>
        </>
      )}
    </main>
  );
}

export default Feed;
