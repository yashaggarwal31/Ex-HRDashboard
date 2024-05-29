"use client";
import { updateUserRoleMapping } from "@/lib/users";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function UserEdit({ user, userFields }) {
  const router = useRouter();

  const [role, setRole] = useState(() => {
    const matchingRole = userFields.roles.find(
      (role) => role.rolename === user.rolename
    );
    return matchingRole ? matchingRole.id : "";
  });
  const [group, setGroup] = useState(() => {
    const matchingGroup = userFields.groups.find(
      (group) => group.groupname === user.groupname
    );
    return matchingGroup ? matchingGroup.id : "";
  });
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [category, setCategory] = useState(() => {
    const matchingCategory = userFields.categories.find(
      (category) => category.categoryname === user.categoryname
    );
    return matchingCategory ? matchingCategory.id : "";
  });
  const [savingStatus, setSavingStatus] = useState(false);

  const [radioOption, setRadioOption] = useState(
    user.can_create_survey ? "yes" : "no"
  );

  const handleSubmit = async () => {
    // user.role_id,
    //   user.group_id,
    //   user.sub_category_id,
    //   user.can_create_survey,
    //   user.user_id,
    const userRoles = {
      user_id: user.id,
      role_id: role,
      category_id: category,
      group_id: group,
      can_create_survey: radioOption === "yes" ? true : false,
    };

    try {
      setSavingStatus(true);
      await updateUserRoleMapping(userRoles);
      router.push("/admin/manage-users");
      setSavingStatus(false);
    } catch (ex) {}
  };

  //   console.log("user ", user);
  //   console.log("fields ", userFields);

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-md">
      <div className="p-6">
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
            Name:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            value={user.username}
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            value={user.email}
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="role">
            Role: (Current &quot;{user.rolename}&quot;)
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="role"
            onChange={(e) => setRole(e.target.value)}
            value={role}
          >
            {userFields.roles.map((role, idx) => (
              <option value={role.id} key={idx}>
                {role.rolename}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2" htmlFor="group">
            Group: (Current &quot;{user.groupname}&quot;)
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="group"
            value={group}
            onChange={(e) => {
              setGroup(e.target.value);
              const filteredCategories = userFields.categories.filter(
                (cat) => cat.group_id === e.target.value
              );
              setFilteredCategories(filteredCategories);
            }}
          >
            {userFields.groups.map((group, idx) => (
              <option value={group.id} key={idx}>
                {group.groupname}
              </option>
            ))}
            <option value="null">None</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="category"
          >
            Category: (Current &quot;{user.categoryname}&quot;)
          </label>
          <select
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {filteredCategories.map((category, idx) => (
              <option value={category.id} key={idx}>
                {category.categoryname}
              </option>
            ))}
            <option value="null">None</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Can Create Survey?
          </label>
          <span className="flex flex-row gap-6">
            <div onClick={() => setRadioOption("yes")}>
              <input
                type="radio"
                id="yes"
                value="yes"
                checked={radioOption === "yes"}
                onChange={() => setRadioOption("yes")}
              />
              <label htmlFor="yes" className="ml-2">
                Yes
              </label>
            </div>
            <div onClick={() => setRadioOption("no")}>
              <input
                type="radio"
                id="no"
                value="no"
                checked={radioOption === "no"}
                onChange={() => setRadioOption("no")}
              />
              <label htmlFor="no" className="ml-2">
                No
              </label>
            </div>
          </span>
        </div>
        <div className="flex flex-row items-center gap-6">
          <button
            className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={handleSubmit}
            disabled={savingStatus}
          >
            {savingStatus ? "Saving Changes..." : "Save Changes"}
          </button>
          <Link href={"/admin/manage-users"}>
            <button
              className="flex-1 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              // onClick={() => onCloseView(false)}
            >
              Cancel
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
