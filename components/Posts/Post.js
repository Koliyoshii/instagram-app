import { useSession } from "next-auth/react";
import {
  EllipsisHorizontalIcon,
  HeartIcon as HeartIconSolid,
} from "@heroicons/react/24/solid";
import {
  BookmarkIcon,
  FaceSmileIcon,
  ChatBubbleLeftEllipsisIcon,
  HeartIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/outline";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useEffect, useState } from "react";
import Moment from "react-moment";

function Post({ id, username, userImg, img, caption }) {
  const { data: session } = useSession();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState([]);

  useEffect(() => {
    setHasLiked(
      likes.findIndex((like) => like.id === session?.user?.uid) !== -1
    );
  }, [likes, session]);

  useEffect(() => {
    return onSnapshot(collection(db, "posts", id, "likes"), (snapshot) =>
      setLikes(snapshot.docs)
    );
  }, [id]);

  useEffect(() => {
    return onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => {
        setComments(snapshot.docs);
      }
    );
  }, [id]);

  const likePost = async () => {
    if (hasLiked) {
      await deleteDoc(doc(db, "posts", id, "likes", session.user.uid));
    } else {
      await setDoc(doc(db, "post", id, "likes", session.user.uid), {
        username: session.user.username,
      });
    }
  };

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    try {
      console.log("Sending comment...")
      const username = session ? session.user.username : "Test";
      const userImage = session ? session.user.image : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png";
      const res = await addDoc(collection(db, "posts", id, "comments"), {
        comment: commentToSend,
        username: username,
        userImage: userImage,
        timestamp: serverTimestamp(),
      });

      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-white my-7 rounded-sm">
      {/* Header */}
      <div className="flex items-center p-5">
        <img
          src={userImg}
          alt={username}
          className="rounded-full h-12 w-12 object-contain border p-1 mr-3"
        />
        <p className="flex-1 font-bold">{username}</p>
        <EllipsisHorizontalIcon className="h-5" />
      </div>

      {/* Image */}
      <img src={img} alt={username} className="object-cover w-full" />

      {/* Buttons */}
      {session && (
        <div className="flex justify-between px-4 pt-4">
          <div className="flex space-x-4 ">
            {hasLiked ? (
              <HeartIconSolid
                onClick={likePost}
                className="btn-icon text-red-500"
              />
            ) : (
              <HeartIcon onClick={likePost} className="btn-icon" />
            )}

            <ChatBubbleLeftEllipsisIcon className="btn-icon" />
            <PaperAirplaneIcon className="btn-icon" />
          </div>
          <BookmarkIcon className="btn-icon" />
        </div>
      )}

      {/* Caption */}
      <p className="p-5 truncate">
        {likes.length > 0 && (
          <p>
            <span className="font-bold mr-1">{likes.length}</span> likes
          </p>
        )}

        <span className="font-bold mr-1">{username}</span>
        {caption}
      </p>

      {/* Comments */}
      {comments.length > 0 && (
        <div className="ml-10 h-20 overflow-y-scroll scrollbar-thumb-black scrollbar-thin">
          {comments.map((comment) => {
            <div key={comment.id} className="flex items-center space-x-2 mb-3">
              <img
                className="h-7 rounded-full"
                src={comment.data().userImage}
                alt=""
              />
              <p className="flex-1 text-sm">
                <span className="font-bold">{comment.data().username}</span>
                {comment.data().comment}
              </p>

              {/* <Moment className="pr-5 text-xs" fromNow>
                {comment.data().timestamp.toDate()}
              </Moment> */}
            </div>;
          })}
        </div>
      )}

      {/* Comment Input */}
      {!session && (
        <form className="flex items-center p-4 space-x-2">
          <FaceSmileIcon className="h-7" />
          <input
            placeholder="Add a comment"
            className="border-none flex-1 focus:ring-0"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <button
            type="submit"
            disabled={!comment.trim()}
            onClick={sendComment}
            className="font-smibold text-blue-400"
          >
            Post
          </button>
        </form>
      )}
    </div>
  );
}

export default Post;
