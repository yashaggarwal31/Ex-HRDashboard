import React, { Suspense } from "react";
import { getUserTickets } from "@/lib/tickets";
import UserTicketSearch from "./UserTicketSearch";
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

  // if (!user) {
  //   console.log("no user");
  // } else {
  //   console.log("ig", user.id);
  // }
  const ticketData = await getUserTickets(userId);

  // console.log("users page, ticket data: ", ticketData);

  return <UserTicketSearch surveyData={ticketData} />;
}

export default function TicketPage() {
  return (
    <div>
      <Suspense
        fallback={
          <div className="fixed top-0 left-0 w-screen h-screen z-[99999999999999] flex flex-col items-center justify-center bg-black/40">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>{" "}
            <h3>Fetching Tickets ...</h3>{" "}
          </div>
        }
      >
        <UserTickets />
      </Suspense>
    </div>
  );
}
