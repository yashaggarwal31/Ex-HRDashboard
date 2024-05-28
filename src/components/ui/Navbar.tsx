/* eslint-disable @next/next/no-img-element */
"use client";

import { SessionProvider } from 'next-auth/react'


import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
// import TicketGeneratorButton from "./TicketGeneratorButton";
import { Button } from "./button";
import { useRouter } from "next/navigation";
// import  {signOut} from "@/app/auth"
// import { UserButton } from "@clerk/clerk-react";
import Image from "next/image";
import { setUserState, getUserState } from "@/app/utils/commonStates";
// import { useRouter } from "next/router";
import { usePathname } from "next/navigation";
import ProfileIcon from "./NavbarProfileIcon";

const Navbar: React.FC = () => {
  const router = useRouter();
  const path = usePathname();

  const [inuser, setAsUser] = useState(() =>
    path.includes("admin") ? false : true
  );

  function handleAdminCLick() {
    if (path.includes("user")) {
      if (path.includes("feedback")) {
        router.push("/admin/feedback");
      } else if(path.includes("survey")) {
        router.push("/admin/survey");
      }
      else{
        const newPath = path.replace("user", "admin");
        router.push(newPath);
      }
    } else if(path.includes("admin")) {
      if (path.includes("dashboard") || path.includes("manage-users")) {
        router.push("/user/ticket");
      }else if(path.includes("survey")) {
        router.push("/user/survey");
      } else {
        const newPath = path.replace("admin", "user");
        router.push(newPath);
      }
    }
  }

  return (
    <>
      <nav className="bg-sky-950">
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div className="relative flex h-16 items-center justify-between">
            <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div className="flex flex-shrink-0 items-center">
                <Image
                  width={100}
                  height={100}
                  className="w-auto h-7 sm:h-8"
                  src="https://merakiui.com/images/logo.svg"
                  alt=""
                />
              </div>
              <div className="hidden sm:ml-6 sm:block">
                <div className="flex space-x-4">
                  {inuser ? (
                    <>
                      <Link
                        href="/user/ticket"
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Tickets
                      </Link>
                      <Link
                        href="/user/feedback"
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Feedbacks
                      </Link>

                      <Link
                        href="/user/survey"
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                      >
                        Surveys
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        href="/admin/dashboard"
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white cursor-pointer"
                      >
                        DashBoard
                      </Link>
                      <Link
                        href="/admin/ticket"
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Tickets
                      </Link>
                      <Link
                        href="/admin/feedback"
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Feedbacks
                      </Link>

                      <Link
                        href="/admin/survey"
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Surveys
                      </Link>
                      <Link
                        href="/admin/manage-users"
                        className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        Manange Users
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
            <button
              className="rounded-md min-w-20 bg-gray-700 px-3 py-2 mx-10 text-sm font-medium text-gray-200 hover:bg-gray-950 hover:text-white"
              onClick={handleAdminCLick}
            >
              SWITCH TO {(inuser && <>ADMIN</>) || <>USER</>}
            </button>

            {/*<UserButton />*/}
            <SessionProvider>
            <ProfileIcon/>
            </SessionProvider>
            
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
