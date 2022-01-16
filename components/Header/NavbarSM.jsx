import Link from "next/link"
import { useState } from "react"
import ThemeToggle from "../ThemeToggle"
import Drawer from "../shared/Drawer"
import Image from "next/image"
import trancate from "../../utils/trancate"
import { useRouter } from "next/router"
import { HiOutlineCog, HiOutlineLogout } from "react-icons/hi"

export default function NavbarSM({ navLists }) {
   const [logged, setLogged] = useState(true)
   const { pathname } = useRouter()

   const handleLogOut = () => setLogged(false)

   return (
      <Drawer>
         <div className="h-full flex flex-col">
            {logged ? (
               <div className="group flex items-center  space-x-4 ">
                  <div className="relative img">
                     <Image
                        className="w-full rounded-full "
                        src="/images/user.jpg"
                        alt="Jon Doe"
                        width={70}
                        height={70}
                        objectFit="cover"
                     />
                  </div>

                  <div className="max-w-sm space-y-1">
                     <h2 title="Jon Doe" className="font-bold text-lg mb-2 text-sky-500 transition duration-500">
                        {trancate("John Doe", 30)}
                     </h2>

                     <p className="text-gray-600 dark:text-gray-400 text-sm ">@johndoe</p>
                  </div>
               </div>
            ) : (
               <div className="flex items-center justify-center space-x-2 text-xs sm:text-sm">
                  <Link href="/">
                     <a className="btn-primary">Login</a>
                  </Link>

                  <Link href="/">
                     <a className="btn-secondary">Sign Up</a>
                  </Link>
               </div>
            )}

            <nav className="flex flex-col text-sm space-y-1 mt-10">
               {navLists.map((list) => (
                  <Link href={list.href} key={list.title}>
                     <a className={`btn-ghost ${list.href === pathname && "!text-sky-500"}`}>{list.title}</a>
                  </Link>
               ))}
            </nav>

            <div className=" p-1 mt-auto">
               <div className="flex items-center justify-evenly ">
                  <ThemeToggle />

                  <button className="btn-icon ">
                     <HiOutlineCog size={20} />
                  </button>

                  {logged && (
                     <button className="btn-icon " onClick={handleLogOut}>
                        <HiOutlineLogout size={20} />
                     </button>
                  )}
               </div>
            </div>
         </div>
      </Drawer>
   )
}