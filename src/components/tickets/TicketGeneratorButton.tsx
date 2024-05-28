"use client";

import React from "react";
import Link from "next/link";

function TicketGeneratorButton() {
  return (
    <Link
      href="/user/ticket/new"
      className="inline-block cursor-pointer rounded-md bg-[#46a46c] p-2 text-white"
    >
      <div>+ Add Ticket</div>
    </Link>
  );
}

export default TicketGeneratorButton;
