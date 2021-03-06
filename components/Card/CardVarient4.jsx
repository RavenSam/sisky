import Image from "next/image"
import Link from "next/link"
import trancate from "../../utils/trancate"
import moment from "moment"

export default function CardVarient4({ post, num }) {
   return (
      <div className="group flex  space-x-4 ">
         <div className="relative img min-w-[80px]">
            <Image
               className="w-full rounded-full"
               src={post.featuredImage.data.attributes.formats.small.url}
               alt={post.title}
               width={80}
               height={80}
               objectFit="cover"
               quality={100}
            />

            {num && (
               <span className="absolute -top-1 -left-1 text-white text-center leading-[2rem] w-8 h-8 rounded-full bg-sky-500 border border-white">
                  {num}
               </span>
            )}
         </div>

         <div className="max-w-sm space-y-5">
            <div className="">
               <Link href={`/post/${post.slug}`}>
                  <a
                     title={post.title}
                     className="text-sm sm:text-base font-semibold mb-2 group-hover:text-sky-500 transition duration-500"
                  >
                     {trancate(post.title, 50)}
                  </a>
               </Link>

               <p className="text-gray-600 font-medium dark:text-gray-400 text-sm ">
                  {moment(post.publishedAt).format("DD MMM YYYY")}
               </p>
            </div>
         </div>
      </div>
   )
}
