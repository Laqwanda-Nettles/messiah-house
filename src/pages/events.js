import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function Events() {
  return (
    <>
      <Head>
        <title>Events</title>
        <meta
          name="description"
          content="Messiah House Community Development Corporation non-profit event page that displays upcoming events, news, and sponsors."
          key="desc"
        />
      </Head>
      <Navbar />
      <Header
        title={"Events"}
        subtitle={"Bringing the Community Together"}
        description={
          "Join us for upcoming events that inspire, educate, and empower."
        }
      />
      <div className="flex justify-center items-center m-6">
        <iframe
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=UTC&showPrint=0&title=Messiah's%20House%20Test%20Calendar&src=M2U4ZjhjNzZmMmEzNmM2N2ExZDlkMWQ5NWE5ZWRjMGIwYzdmZTllN2NlYWUxYTIzYmE1YmYxZjkwZGJmNDU0NEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%234285F4"
          className="border-2 border-secondary shadow-md shadow-info rounded-xl"
          width="800"
          height="600"
          frameborder="0"
          scrolling="no"
        ></iframe>
      </div>

      <Footer />
    </>
  );
}
