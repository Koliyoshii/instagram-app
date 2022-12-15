import { Menu, Transition } from "@headlessui/react";
import {
    ArrowRightOnRectangleIcon,
  HeartIcon,
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserGroupIcon,
} from "@heroicons/react/24/outline";
import { Bars3BottomRightIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import { useState } from "react";
import { useRecoilState } from "recoil";
import { modalState } from "../../atoms/modalAtom";

function MobileMenu() {
  const { data: session, status } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [showModal, setShowModal] = useRecoilState(modalState);

  return (
    <Menu as="div">
      <Menu.Button>
        {!isOpen && (
          <Bars3BottomRightIcon
            onClick={() => setIsOpen(!isOpen)}
            className="h-7 w-7 cursor-pointer md:hidden inline-flex hover:scale-125 transition-all duration-150 ease-out"
          />
        )}
        {isOpen && (
          <XMarkIcon
            onClick={() => setIsOpen(!isOpen)}
            className="h-7 w-7 cursor-pointer md:hidden inline-flex hover:scale-125 transition-all duration-150 ease-out"
          />
        )}
      </Menu.Button>

      <Menu.Items
        as="div"
        className={`absolute ${!session ? "right-14" : "right-4"} w-auto h-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`}
      >
        <div className="items-center md:hidden inline-flex justify-end space-x-2 pl-2 pr-2">
          {session ? (
            <>
              <Menu.Item onClick={() => {setShowModal(true); setIsOpen(!isOpen)}} as="div">
                <PlusCircleIcon   className="header-mobile-icons" />
              </Menu.Item>
              <Menu.Item onClick={() => setIsOpen(!isOpen)} as="div" className="p-2 hover:bg-gray-100">
                <PaperAirplaneIcon className="header-mobile-icons -rotate-45" />
                <div className="relative -translate-x-2 -translate-y-2 -mr-3 inline-flex md:hidden items-center justify-center animate-pulse top-1 right-1 text-xs w-5 h-5 bg-red-500 rounded-full">
                  3
                </div>
              </Menu.Item>
              <Menu.Item onClick={() => setIsOpen(!isOpen)} as="div">
                <UserGroupIcon className="header-mobile-icons" />
              </Menu.Item>
              <Menu.Item onClick={() => setIsOpen(!isOpen)} as="div">
                <HeartIcon className="header-mobile-icons" />
              </Menu.Item>
              <Menu.Item onClick={() => {signOut; setIsOpen(!isOpen)}} as="div">
                <ArrowRightOnRectangleIcon className="header-mobile-icons" />
              </Menu.Item>
            </>
          ) : (
            <Menu.Item onClick={() => setIsOpen(!isOpen)} as="div">
              <p className="text-blue-400 p-2 cursor-pointer active:text-blue-600" onClick={() => signIn}>Login</p>
            </Menu.Item>
          )}
        </div>
      </Menu.Items>
    </Menu>
  );
}

export default MobileMenu;
