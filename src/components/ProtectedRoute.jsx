import { useAuth } from "@/context/AuthProvider";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.replace("/login"); //Prevents back button from returning to protected page
      } else {
        setAuthChecked(true);
      }
    }
  }, [user, loading, router]);

  if (loading || !authChecked) {
    return (
      <p className="text-center text-2xl font-semibold text-info">
        Checking authentication...
      </p>
    );
  }

  return <>{children}</>;
}
