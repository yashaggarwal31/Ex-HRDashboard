import React, { Suspense } from "react";
import ManageUsers from "./ManageUsers";
import {getAllUsers} from "@/lib/users"
// import LoaderComponent from '@/components/common/fetching-loader';

async function ManageUsersPage() {
  //fetch your data here, pass to dashboard as props
  // const card = await cardFeedbackData();

  const users = await getAllUsers();

  return <ManageUsers users={users}/>;
}

export default function AdminManageUserPage() {
  return (
    <div>
      <Suspense fallback={<p>Fetching data...</p>}>
        <ManageUsersPage />
      </Suspense>
    </div>
  );
}
