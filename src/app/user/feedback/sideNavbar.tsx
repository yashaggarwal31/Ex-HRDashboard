"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SideNavbar({ page }) {
  const normalClass =
    "inline-block my-4 text-center px-4 py-2 bg-slate-300 transition duration-150 ease-linear hover:bg-slate-400";
  const activeClass =
    "inline-block my-4 text-center px-4 py-2 bg-slate-600 text-white";

  return (
    <div className="py-2 flex flex-row w-full items-center justify-center bg-zinc-200 sticky top-0 mb-2">
      <Link
        href={`/user/feedback`}
        className={page === 1 ? activeClass : normalClass}
      >
        Feedback Form
      </Link>
      <Link
        href="/user/feedback/[id]"
        as={`/user/feedback/${1}`}
        className={page === 2 ? activeClass : normalClass}
      >
        My Feedbacks
      </Link>
    </div>
  );
}
