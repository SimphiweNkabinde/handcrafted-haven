import { signOut } from "@/auth";
import { ArrowRightStartOnRectangleIcon, UserIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Link from "next/link";
import { User } from "next-auth";
import ProfileBtn from "./profile-btn";

export default function NavbarUserOptions({ user }: { user: User | null }) {
  const userId = (user as any)?.id as string | undefined;

  return (
    <div>
      {!user ? (
        <Link
          href="/login"
          className="bg-gray-900 text-white rounded-lg px-4 py-1.5 hover:bg-gray-800 cursor-pointer"
        >
          Login
        </Link>
      ) : (
        <div className="relative">
          <ProfileBtn username={user.name ?? "User"} />

          <div
            className={clsx(
              "absolute hidden end-0 mt-1 z-10 bg-white border border-gray-200 rounded tex-sm text-gray-700 font-thin shadow"
            )}
          >
            <div className="px-5 py-3 border-b border-gray-200 text-xs">
              <p className="capitalize text-gray-800">{user.name}</p>
              <p className="text-xs">{user.email}</p>
            </div>

            <div className="text-sm flex flex-col my-2">
              <form
                className="px-4 py-2 text-red-500 flex gap-1 cursor-pointer"
                action={async () => {
                  "use server";
                  await signOut();
                }}
              >
                <ArrowRightStartOnRectangleIcon className="w-5" />
                <button type="submit">Sign Out</button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
