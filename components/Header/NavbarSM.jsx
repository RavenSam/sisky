import Link from "next/link"
import ThemeToggle from "../ThemeToggle"
import Drawer from "../shared/Drawer"
import Image from "next/image"
import trancate from "../../utils/trancate"
import { useRouter } from "next/router"
import { HiOutlineCog, HiOutlineLogout } from "react-icons/hi"
import logout from "../../lib/logout"
import Avatar from "react-avatar"

export default function NavbarSM({ navLists, user }) {
   const { pathname, push } = useRouter()

   return (
      <Drawer>
         <div className="h-full flex flex-col space-y-6">
            {user ? (
               <div className="group flex items-center  space-x-4 cursor-pointer" onClick={() => push("/user")}>
                  <Avatar
                     name={user.username}
                     src={user.photo}
                     email={user.email}
                     maxInitials={2}
                     size="70"
                     round={true}
                     className="!leading-[75px]"
                  />

                  <div className="max-w-sm space-y-1">
                     <h2 title={user.username} className="font-bold text-lg mb-2 text-sky-500 transition duration-500">
                        {trancate(user.username, 15)}
                     </h2>

                     <p className="text-gray-600 dark:text-gray-400 text-sm ">{user.email}</p>
                  </div>
               </div>
            ) : (
               <div className="flex flex-col items-center justify-center space-y-2 text-sm">
                  <Link href="/login">
                     <a className="btn-primary w-full justify-center">Login</a>
                  </Link>

                  <Link href="/sign-up">
                     <a className="btn-secondary w-full justify-center">Sign Up</a>
                  </Link>
               </div>
            )}

            <div className=" p-1">
               <div className="flex items-center justify-evenly ">
                  <ThemeToggle />

                  <button className="btn-icon ">
                     <HiOutlineCog size={20} />
                  </button>

                  {user && (
                     <button className="btn-icon " onClick={logout}>
                        <HiOutlineLogout size={20} />
                     </button>
                  )}
               </div>
            </div>

            <nav className="flex flex-col text-sm space-y-1">
               {navLists.map((list) => (
                  <Link href={list.href} key={list.title}>
                     <a className={`btn-ghost ${list.href === pathname && "!text-sky-500"}`}>{list.title}</a>
                  </Link>
               ))}
            </nav>
         </div>
      </Drawer>
   )
}
