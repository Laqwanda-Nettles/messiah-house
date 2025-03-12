import { AuthProvider } from "@/context/AuthProvider";
import "@/styles/globals.css";
import { Parkinsans } from "next/font/google";
const parkinsans = Parkinsans({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <main className={parkinsans.className}>
        <Component {...pageProps} />
      </main>
    </AuthProvider>
  );
}
