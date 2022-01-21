import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { BsEyeFill, BsEnvelope, BsKey, BsEyeSlashFill, BsArrowLeft, BsFacebook } from "react-icons/bs"
import { FcGoogle } from "react-icons/fc"
import { useForm } from "react-hook-form"
import * as yup from "yup"
import { yupResolver } from "@hookform/resolvers/yup"

const schema = yup.object().shape({
   email: yup.string().email().required(),
   password: yup.string().min(8).max(32).required(),
})

const inputs = [
   { name: "email", label: "your email", type: "email", icon: BsEnvelope },
   { name: "password", label: "your password", type: "password", icon: BsKey },
]

export default function Login() {
   const [showPassword, setShowPassword] = useState({ password: false })

   const { back } = useRouter()

   const {
      register,
      handleSubmit,
      formState: { errors },
      reset,
   } = useForm({
      resolver: yupResolver(schema),
   })

   const onSubmitHandler = (data) => {
      console.log(data)
      reset()
   }

   const handleShowPW = (name) => {
      setShowPassword({ ...showPassword, [name]: !showPassword[name] })
   }

   return (
      <div className="flex items-center justify-center min-h-screen">
         <div className="w-full max-w-md p-2">
            <button title="go back" className="btn-icon !text-sky-500" aria-label="go back" onClick={back}>
               <BsArrowLeft size={20} />
            </button>

            <div className="card bg-white dark:bg-gray-900 rounded-xl px-4 py-8 shadow-xl">
               <h1 className="text-3xl capitalize font-bold pb-8 tracking-widest">
                  login<span className="text-sky-500">.</span>
               </h1>

               <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-4">
                     <button className="justify-center gap-4  w-full bg-white rounded-md py-4 btn border hover:opacity-80">
                        <FcGoogle size={25} />
                     </button>

                     <button className="justify-center gap-4 text-white   bg-[#4267B2] w-full  rounded-md py-4 btn border hover:opacity-80">
                        <BsFacebook size={25} />
                     </button>
                  </div>

                  <div className="flex items-center justify-center">
                     <hr className=" flex-1 dark:border-gray-600" />
                     <span className="p-5 capitalize text-sm text-gray-700 darktext-gray-500 font-medium">or</span>
                     <hr className="  flex-1 dark:border-gray-600" />
                  </div>
               </div>

               <form className="space-y-5" onSubmit={handleSubmit(onSubmitHandler)}>
                  {inputs.map((input, i) => (
                     <div key={i} className="space-y-2">
                        <label htmlFor={input.name} className="text-sm capitalize font-medium flex items-center gap-2">
                           <span className="text-sky-500 ">
                              <input.icon size={20} />
                           </span>
                           {input.label}
                        </label>
                        <div className="relative">
                           <input
                              className="input pr-12"
                              name={input.name}
                              {...register(input.name)}
                              type={
                                 input.type !== "password" ? input.type : showPassword[input.name] ? "text" : "password"
                              }
                           />

                           {input.type === "password" && (
                              <button
                                 type="button"
                                 className="text-sky-500  h-full btn px-3 rounded-r-xl absolute top-1/2 right-0 transform  -translate-y-1/2 "
                                 onClick={() => handleShowPW(input.name)}
                              >
                                 {showPassword[input.name] ? <BsEyeFill size={20} /> : <BsEyeSlashFill size={20} />}
                              </button>
                           )}
                        </div>
                        <p className="text-pink-500 text-sm px-2">{errors[input.name]?.message}</p>
                     </div>
                  ))}

                  <div className="text-right">
                     <Link href="#">
                        <a className="link font-medium">Forget your password?</a>
                     </Link>
                  </div>

                  <button type="submit" className="btn-primary mx-auto">
                     Login
                  </button>
               </form>
            </div>

            <p className="text-sm text-center my-4 text-gray-600 dark:text-gray-400">
               {`Don't have an account? `}
               <Link href="/signup">
                  <a className="text-sky-500 font-medium">Sign up</a>
               </Link>
            </p>
         </div>
      </div>
   )
}
