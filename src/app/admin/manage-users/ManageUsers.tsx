"use client";
import Link from "next/link";
import React from "react";

export default function ManageUsers({ users }) {
  console.log(users);
  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg py-4 px-4">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3">
              Email
            </th>
            <th scope="col" className="px-6 py-3">
              Role
            </th>
            <th scope="col" className="px-6 py-3">
              Group
            </th>
            <th scope="col" className="px-6 py-3">
              Category
            </th>
            <th scope="col" className="px-6 py-3">
              Create Survey
            </th>
            <th scope="col" className="px-6 py-3">
              <span className="sr-only">Edit</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, idx) => (
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
              >
                {user.username}
              </th>
              <td className="px-6 py-4">{user.email}</td>
              <td className="px-6 py-4">{user.rolename}</td>
              <td className="px-6 py-4">{user.groupname}</td>
              <td className="px-6 py-4">
                {user.categoryname || (
                  <span className="bg-slate-600 px-2 py-2 rounded-full text-white">
                    None
                  </span>
                )}
              </td>
              <td className="px-6 py-4">
                {user.can_create_survey ? (
                  <span className="bg-green-600 px-2 py-2 rounded-full text-white">
                    Yes
                  </span>
                ) : (
                  <span className="bg-red-600 px-2 py-2 rounded-full text-white">
                    No
                  </span>
                )}
              </td>
              <td className="px-6 py-4 text-right">
                <Link href={`manage-users/${user.id}`}>
                  <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline">
                    Edit
                  </button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
