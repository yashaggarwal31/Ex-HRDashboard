import React, { Suspense } from "react";
import UserEdit from "./UserEdit";
import { getUserById, getUsersFormData } from "@/lib/users";

async function AdminEditUser({ userID }: { userID: number }) {
  const user = await getUserById(userID);
  const userFormData = await getUsersFormData();

  return <UserEdit user={user[0]} userFields={userFormData} />;
}

export default function AdminEditUserPage({ params }: { params: any }) {
  return (
    <div>
      <Suspense
        fallback={
          <div className="fixed top-0 left-0 w-screen h-screen z-[99999999999999] flex flex-col items-center justify-center bg-black/40">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div> <h3>Fetching User ...</h3> </div>
        }
      >
        <AdminEditUser userID={params["edit-user"]} />
      </Suspense>
    </div>
  );
}
