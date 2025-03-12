import AdminNavbar from "@/components/AdminNavbar";
import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Portal() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) return <p>Loading...</p>;

  return (
    <div className="flex h-screen">
      <AdminNavbar />
      <div className="flex-1 overflow-y-auto">
        <h1>Welcome, {user.email}!</h1>
      </div>
    </div>
  );
}
