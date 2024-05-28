import React, { Suspense } from "react";
import UserAssignedTickets from "./UserAssignedTickets";
import { getAssignedTickets } from "@/lib/tickets";
// import { auth } from "@clerk/nextjs/server";
import { getServerSession } from "next-auth";
import { config } from "@/auth.config";

async function getGoogleUserId(){
  const session = await getServerSession(config);
  if(!session) return null;
  const user_id = session.user.token.sub
  console.log(user_id)

  return user_id;
}

async function UserTickets() {
  // const { userId } = auth();
  const userId = await getGoogleUserId();
  console.log("UUUUSSSSSEEEERRR", userId);
  const ticketData = await getAssignedTickets(userId);

  // console.log("users page, ticket data: ", ticketData);

  return <UserAssignedTickets ticketData={ticketData} />;
}

export default function TicketPage() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="fixed top-0 left-0 w-screen h-screen z-[99999999999999] flex flex-col items-center justify-center bg-black/40">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>{" "}
            <h3>Fetching Assigned Tickets ...</h3>{" "}
          </div>
        }
      >
        <UserTickets />
      </Suspense>
    </div>
  );
}
