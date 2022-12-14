import { useSession, signIn, signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { HomeIcon } from "@heroicons/react/24/solid";
import {
  MagnifyingGlassIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  Bars3BottomRightIcon,
  UserGroupIcon,
  HeartIcon,
} from "@heroicons/react/24/outline";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom"

function Header() {
  const { data: session, status } = useSession();
  const [showModal, setShowModal] = useRecoilState(modalState);
  const router = useRouter();

  return (
    <header className="border-b-0 border-gray-300 shadow-sm bg-white sticky top-0 z-50">
      <div className="max-w-6xl m-auto">
        <div className="flex justify-between items-center mx-5">
          <div onClick={() => router.push('/')} className="relative hidden lg:inline-grid w-24 cursor-pointer">
            <img src="https://links.papareact.com/ocw" alt="Instagram Logo" />
          </div>
          <div onClick={() => router.push('/')} className="relative inline-grid lg:hidden w-10 h-10 flex-shrink-0 cursor-pointer">
            <img src="https://links.papareact.com/jjm" alt="Instagram Logo" />
          </div>

          <div className="max-w-xs">
            <div className="mt-1 relative bg-whitet p-3">
              <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon className="w-5 h-5" />
              </div>
              <input
                className="bg-gray-50  border-gray-300 rounded-md focus:ring-black focus:border-black block w-full pl-10"
                type="text"
                placeholder="Search"
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4">
            <HomeIcon onClick={() => router.push('/')} className="header-icons" />
            <Bars3BottomRightIcon className=" h-5 w-5 cursor-pointer md:hidden inline-flex hover:scale-125 transition-all duration-150 ease-out" />

            {!session ? (
              <>
                <div className="relative header-button">
                  <PaperAirplaneIcon className="header-icons -rotate-45" />
                  <div className="absolute flex items-center justify-center animate-pulse -top-1 -right-2 text-xs w-5 h-5 bg-red-500 rounded-full">
                    3
                  </div>
                </div>

                <PlusCircleIcon onClick={() => setShowModal(true)} className="header-icons" />
                <UserGroupIcon className="header-icons" />
                <HeartIcon className="header-icons" />
                <img
                  onClick={signOut}
                  src={session?.user?.image}
                  alt="profile-picture"
                  className="h-10 rounded-full w-10 cursor-pointer"
                />
              </>
            ) : (
              <button onClick={signIn}>Sign In</button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
