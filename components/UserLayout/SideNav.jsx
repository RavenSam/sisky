import Image from "next/image"
import {
   BiBookmark,
   BiCog,
   BiGridAlt,
   BiHeart,
   BiHistory,
   BiLogOut,
   BiMenu,
   BiPlusMedical,
   BiUser,
} from "react-icons/bi"
import logout from "../../lib/logout"
import ThemeToggle from "../ThemeToggle"
import trancate from "../../utils/trancate"
import { useRouter } from "next/router"
import Link from "next/link"
import { useTheme } from "next-themes"
import Avatar from "react-avatar"

const navLinks = [
   { name: "dashboard", icon: BiGridAlt, href: "/user" },
   { name: "likes", icon: BiHeart, href: "/user/likes" },
   { name: "bookmarks", icon: BiBookmark, href: "/user/bookmarks" },
   { name: "settings", icon: BiCog, href: "/user/settings" },
]

export default function SideNav({ openNav, setOpenNav, menuDrawer, user, site }) {
   const { theme } = useTheme()
   const { pathname } = useRouter()

   return (
      <>
         <div
            className={`sidebar  fixed top-0 left-0 h-full shadow-xl md:translate-x-0 bg-white dark:bg-gray-900 px-3 py-1 transition-all duration-300 ${
               openNav ? "w-[240px] " : "w-[70px] "
            } ${menuDrawer ? "translate-x-0" : "-translate-x-[240px] "}`}
         >
            <div className="logo_content">
               <div
                  className={`logo  dark:text-white flex items-center gap-2 h-12 w-full transition-all duration-300  ${
                     !openNav && "pointer-events-none opacity-0"
                  }`}
               >
                  <Link href="/">
                     <a className="img overflow-hidden">
                        <Image
                           className="w-full"
                           src={
                              theme === "dark"
                                 ? site.attributes.Dark_logo.data.attributes.url
                                 : site.attributes.Light_logo.data.attributes.url
                           }
                           alt="logo"
                           width={70}
                           height={30}
                           objectFit="contain"
                        />
                     </a>
                  </Link>
               </div>

               <button
                  className={`absolute hidden md:block top-1 transform -translate-x-1/2 dark:text-white  text-xl text-center leading-[50px] h-[50px] w-[50px]  ${
                     openNav ? "left-[90%]" : "left-[70%]"
                  }`}
                  onClick={() => setOpenNav(!openNav)}
                  aria-label="Menu"
               >
                  <BiMenu size={25} />
               </button>
            </div>

            <ul className="nav_list mt-5 space-y-1">
               {navLinks.map((link, i) => (
                  <li key={i} className="group relative h-12 w-full leading-[48px] ">
                     <Link href={`${link.href}`}>
                        <a className={`btn-1 ${pathname === link.href && "!text-sky-500 dark:!bg-white !bg-gray-900"}`}>
                           <span className="h-12 min-w-[48px] rounded-xl flex items-center justify-center">
                              <link.icon size={20} />
                           </span>
                           {openNav && <span className="links_name">{link.name}</span>}
                        </a>
                     </Link>

                     {!openNav && <span className="tooltip ">{link.name}</span>}
                  </li>
               ))}
            </ul>

            <div className="profile_details absolute left-0 bottom-0 w-full text-white px-3 py-1 ">
               {openNav && (
                  <div className="flex items-center my-2">
                     <ThemeToggle className="btn-1 justify-center h-12" />

                     <button className="btn-1 justify-center" onClick={logout} aria-label="log out">
                        <span className="h-12  min-w-[48px] rounded-xl flex items-center justify-center">
                           <BiLogOut size={20} />
                        </span>
                     </button>
                  </div>
               )}

               <div className="group flex items-center  space-x-4 ">
                  <Avatar
                     name={user.username}
                     src={user.photo}
                     email={user.email}
                     maxInitials={2}
                     size="45"
                     round={true}
                     className="!leading-[50px]"
                  />
                  {openNav && (
                     <div className="max-w-sm space-y-1">
                        <h2 title={user.username} className="font-bold text-sm text-sky-500 transition duration-500">
                           {trancate(user.username, 15)}
                        </h2>

                        <p className="text-gray-600 dark:text-gray-400 text-xs ">{user.email}</p>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </>
   )
}
