import "@/styles/globals.css";
import { Parkinsans } from "next/font/google";
const parkinsans = Parkinsans({ subsets: ["latin"] });

export default function App({ Component, pageProps }) {
  return (
    <main className={parkinsans.className}>
      <Component {...pageProps} />
    </main>
  );
}
