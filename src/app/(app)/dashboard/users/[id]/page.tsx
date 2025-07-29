"use client";
import { useParams } from "next/navigation";
import { useUsers } from "@/hooks/use-users";
import { useEffect } from "react";
import Loader from "../../../../../components/dashboard/loader";
import Image from "next/image";

export default function UserDetailPage() {
  const { id } = useParams();
  const { users, getUsers, loadingUsers } = useUsers();

  useEffect(() => {
    if (users.length === 0) getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const user = users.find((u) => u.id === id);

  if (loadingUsers && !user) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <Loader />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <h1 className="text-2xl font-bold mb-4">User Not Found</h1>
        <p className="text-gray-600">The requested user does not exist.</p>
      </div>
    );
  }

  const {
    firstName,
    lastName,
    username,
    email,
    roles,
    phone,
    position,
    avatar,
    isActive,
    bio,
    billing,
    shipping,
    createdAt,
    updatedAt,
    workspaces,
  } = user;

  const imgUrl =
    typeof avatar === "object" && avatar?.url
      ? avatar.url
      : "/api/media/file/4.png";
  const imgAlt =
    typeof avatar === "object" && avatar?.alt ? avatar.alt : username || "user";

  return (
    <div className="app-page px-2 pb-8">
      <div className="mb-8 flex flex-col sm:flex-row gap-8">
        {/* Left: Profile Picture and Basic Info */}
        <div className="w-full sm:w-80 flex-shrink-0 flex flex-col items-center">
          <div className="mb-6 w-36 h-36 rounded-full overflow-hidden border">
            <Image
              src={imgUrl}
              width={144}
              height={144}
              alt={imgAlt}
              className="object-cover w-full h-full"
            />
          </div>
          <div className="text-xl font-bold mb-1 text-center">
            {firstName || lastName
              ? `${firstName || ""} ${lastName || ""}`.trim()
              : username}
          </div>
          <div className="text-xs text-gray-500 mb-2">{email}</div>
          <div className="flex gap-1 flex-wrap justify-center mb-2">
            {roles?.map((role) => (
              <span
                key={role}
                className="px-2 py-1 rounded bg-orange-100 text-orange-700 text-xs font-medium"
              >
                {role}
              </span>
            ))}
          </div>
          <span
            className={
              "mt-1 text-xs font-semibold " +
              (isActive ? "text-green-700" : "text-red-500")
            }
          >
            {isActive ? "Active" : "Inactive"}
          </span>
        </div>
        {/* Right: Details */}
        <div className="flex-1">
          <h2 className="text-lg font-semibold mb-2">User Details</h2>
          <table className="w-full text-sm mb-6">
            <tbody>
              <tr>
                <td className="font-medium pr-4">Username</td>
                <td>{username}</td>
              </tr>
              {position && (
                <tr>
                  <td className="font-medium pr-4">Position</td>
                  <td>{position}</td>
                </tr>
              )}
              {phone && (
                <tr>
                  <td className="font-medium pr-4">Phone</td>
                  <td>{phone}</td>
                </tr>
              )}
              {bio && (
                <tr>
                  <td className="font-medium pr-4 align-top">Bio</td>
                  <td>{bio}</td>
                </tr>
              )}
              {workspaces &&
                Array.isArray(workspaces) &&
                workspaces.length > 0 && (
                  <tr>
                    <td className="font-medium pr-4">Workspaces</td>
                    <td>
                      {workspaces
                        .map((ws) =>
                          typeof ws === "object" && ws.name
                            ? ws.name
                            : String(ws)
                        )
                        .join(", ")}
                    </td>
                  </tr>
                )}
            </tbody>
          </table>
          {/* Billing */}
          {billing && (
            <div className="mb-4">
              <h3 className="text-base font-semibold mb-1">Billing Info</h3>
              <div className="text-xs bg-gray-50 rounded p-3">
                {[
                  billing.first_name,
                  billing.last_name,
                  billing.company,
                  billing.address_1,
                  billing.address_2,
                  billing.city,
                  billing.state,
                  billing.country,
                  billing.postcode,
                  billing.email,
                  billing.phone,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </div>
            </div>
          )}
          {/* Shipping */}
          {shipping && (
            <div>
              <h3 className="text-base font-semibold mb-1">Shipping Info</h3>
              <div className="text-xs bg-gray-50 rounded p-3">
                {[
                  shipping.first_name,
                  shipping.last_name,
                  shipping.company,
                  shipping.address_1,
                  shipping.address_2,
                  shipping.city,
                  shipping.state,
                  shipping.country,
                  shipping.postcode,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </div>
            </div>
          )}
          {/* Meta */}
          <div className="mt-6 text-xs text-gray-400">
            <div>
              <span className="font-medium">Created:</span>{" "}
              {createdAt && new Date(createdAt).toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Updated:</span>{" "}
              {updatedAt && new Date(updatedAt).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
