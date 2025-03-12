import { useEffect } from "react";
import { auth } from "../config/firebase";

export default function TestFirebase() {
  useEffect(() => {
    console.log("Firebase Auth Instance:", auth);
  }, []);

  return <h1>Firebase Initialized!</h1>;
}
