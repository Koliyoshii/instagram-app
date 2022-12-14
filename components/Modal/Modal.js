import { useRecoilState } from "recoil";
import { Fragment, useRef, useState } from "react";
import { db, storage } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "@firebase/firestore";
import { ref, getDownloadURL, uploadString } from "@firebase/storage";
import { useSession } from "next-auth/react";
import { modalState } from "../../atoms/modalAtom";
import { Dialog, Transition } from "@headlessui/react";
import { ArchiveBoxXMarkIcon, CameraIcon } from "@heroicons/react/24/solid";

function Modal() {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useRecoilState(modalState);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const filePickerRef = useRef();
  const captionRef = useRef();

  const uploadPost = async () => {
    try {
      setLoading(true);
      console.log("uploading...");

      // 1) Create a post and add to firestore 'posts' collection
      const docRef = await addDoc(collection(db, "posts"), {
        username: "koliyoshii", //session.user.username,
        caption: captionRef.current.value,
        profileImg:
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png",
        timestamp: serverTimestamp(),
      });
      console.log("docRef >>> ", docRef);

      // 2) get the post ID for the newly created post
      console.log("New doc added with ID: ", docRef.id);
      const imageRef = ref(storage, `posts/${docRef.id}/image`);
      console.log("docRef >>> ", imageRef);

      // 3) upload Image to firebase storage with the post ID
      await uploadString(imageRef, selectedFile, "data_url").then(
        async (snapshot) => {
          //4) get a download URL from firebase storage
          const downloadURL = await getDownloadURL(imageRef);
          // and update the original post with image
          await updateDoc(doc(db, "posts", docRef.id), {
            image: downloadURL,
          });
        }
      );

      setShowModal(false);
      setLoading(false);
      setSelectedFile(null);
    } catch (error) {
        console.log("write to DB failed. Reason: ", error)
    }
  };

  const addImageToPost = (e) => {
    // initialize FileReader
    const reader = new FileReader();
    // if the user selected a file
    // its files[0], because the user can only select one file
    if (e.target.files[0]) {
      // The readAsDataURL method is used to read the contents of the specified Blob or File.
      // When the read operation is finished, the readyState becomes DONE, and the load event is triggered
      // https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL
      reader.readAsDataURL(e.target.files[0]);
    }

    // The FileReader.onload property contains an event handler executed when the load event is fired
    reader.onload = (readerEvent) => {
      setSelectedFile(readerEvent.target.result);
    };
  };

  return (
    <Transition.Root show={showModal} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        onClose={setShowModal}
      >
        <div className="flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opaciy-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-70 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opaciy-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
              <div>
                {selectedFile ? (
                  <div className="flex flex-col items-center">
                    <img src={selectedFile} alt="Your uploaded image" />
                    <div
                      className="bg-red-100 rounded-full p-3 -mt-8 cursor-pointer hover:scale-110 transition-all duration-150 ease-out"
                      onClick={() => setSelectedFile(null)}
                    >
                      <ArchiveBoxXMarkIcon className="w-10 h-10 text-red-600" />
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => filePickerRef.current.click()}
                    className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer hover:scale-110 transition-all duration-150 ease-out"
                  >
                    <CameraIcon
                      className="h-6 w-6 text-red-600 animate-pulse"
                      aria-hidden="true"
                    />
                  </div>
                )}

                {/* Upload a Photo */}
                <div className="mt-2 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medum text-gray-900"
                  >
                    Upload a Photo
                  </Dialog.Title>

                  {/* Input for File upload */}
                  <div>
                    <input
                      ref={filePickerRef}
                      type="file"
                      hidden
                      onChange={addImageToPost}
                    />
                  </div>

                  {/* Input for Caption */}
                  <div className="mt-2">
                    <input
                      className="border-none focus:ring-0 w-full text-center"
                      ref={captionRef}
                      type="text"
                      placeholder="Please enter a caption..."
                    />
                  </div>
                </div>

                {/* Upload Button */}
                <div className="mt-5 sm:mt-6">
                  <button
                    className="btn-modal"
                    onClick={uploadPost}
                    disabled={!selectedFile}
                  >
                    {loading ? "Uploading..." : "Upload Post"}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default Modal;
