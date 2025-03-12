import { auth } from "@/config/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

export default function SignOutBtn({ isCollapsed }) {
  const router = useRouter();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("User signed out successfully!");
      router.push("/");
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  return (
    <>
      <button
        onClick={handleSignOut}
        className={`flex items-center p-2 rounded-md bg-red-700 hover:bg-error hover:text-zinc-800 hover:font-medium tooltip tooltip-right ${
          isCollapsed ? "justify-center" : ""
        }`}
        data-tip="Logout"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9"
          />
        </svg>
        <span className={`ml-3 ${isCollapsed ? "hidden" : ""}`}>Sign Out</span>
      </button>
    </>
  );
}
