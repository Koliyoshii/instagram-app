import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import Post from "./Post";

const DUMMY_DATA = [
  {
    id: "123",
    username: "ssssangha",
    userImage:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
    img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
    caption: "THIS IS A CAPTION for a dummy post!",
  },
  {
    id: "456",
    username: "ssssangha",
    userImage:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
    img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
    caption: "THIS IS A CAPTION for a dummy post!",
  },
  {
    id: "789",
    username: "ssssangha",
    userImage:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
    img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
    caption: "THIS IS A CAPTION for a dummy post!",
  },
  {
    id: "101112",
    username: "ssssangha",
    userImage:
      "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
    img: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
    caption: "THIS IS A CAPTION for a dummy post!",
  },
];

function Posts() {
  const posts = DUMMY_DATA;
  const [realPosts, setRealPosts] = useState([]);

  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, "posts"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setRealPosts(snapshot.docs);
      }
    );
  }, []);

  return (
    <div>
      {realPosts.length > 0 &&
        realPosts.map((post) => (
          <Post
            key={post.id}
            id={post.id}
            username={post.username}
            userImg={post.profileImg}
            img={post.data().img}
            caption={post.data().caption}
          />
        ))}
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImg={post.userImage}
          img={post.img}
          caption={post.caption}
        />
      ))}
    </div>
  );
}

export default Posts;
