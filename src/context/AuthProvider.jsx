import { auth } from "@/config/firebase";
import { onAuthStateChanged, signOut, getIdToken } from "firebase/auth";
import { useRouter } from "next/router";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          const token = await getIdToken(currentUser, true);
          localStorage.setItem("token", token);
          setUser(currentUser);
        } catch (error) {
          console.error("Token refresh error: ", error);
          handleLogout(false);
        }
      } else {
        setUser(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async (redirect = true) => {
    await signOut(auth);
    localStorage.removeItem("token");
    setUser(null);
    if (redirect) {
      router.push("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
