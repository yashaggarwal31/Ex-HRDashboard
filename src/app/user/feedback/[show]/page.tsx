import { Suspense } from "react";
import { UserFeedbacks } from "./userFeedbacks";
import { GetUserFeedbacks } from "@/lib/feedbacks";
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

async function ShowUserFeedbacks() {
  const userId = await getGoogleUserId();

  console.log("feedback id", userId);
  const feedbacks = await GetUserFeedbacks(userId);
  return <UserFeedbacks feedbacks={feedbacks} />;
}

export default function ShowUserFeedbacksPage({ params }: { params: any }) {
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
        <ShowUserFeedbacks />
      </Suspense>
    </div>
  );
}
