import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

type UserType = {
  id: string;
  firstName?: string | null;
  lastName?: string | null;
  username?: string | null;
  avatar?: { url?: string | null } | string | null;
};

export function UserAvatar({ user }: { user: UserType }) {
  let avatarUrl = "";
  if (user.avatar && typeof user.avatar === "object" && "url" in user.avatar) {
    avatarUrl = user.avatar.url || "";
  } else if (typeof user.avatar === "string" && user.avatar.length > 10) {
    avatarUrl = `/api/media/file/${user.avatar}`;
  }

  // Initials fallback
  const initials =
    (user.firstName?.[0] || "") +
    (user.lastName?.[0] || user.username?.[0] || "");
  const displayName =
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    user.username ||
    "";

  return (
    <Link href={`/dashboard/users/${user.id}`}>
      <Avatar className="border border-orange-200 bg-white">
        <AvatarImage src={avatarUrl} alt={displayName || "User"} />
        <AvatarFallback>
          {initials ? initials.toUpperCase() : "US"}
        </AvatarFallback>
      </Avatar>
    </Link>
  );
}
