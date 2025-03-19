import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function Events() {
  return (
    <>
      <Head>
        <title>MHCDC | Events</title>
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
          src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FChicago&showPrint=0&showCalendars=0&showTz=0&mode=MONTH&src=YzA2MzY2ODIyMzc4NDcwZWUxMGIwNzA5YTEwZTI0Y2E0NjExY2MyNmJmNzIyZTFlNjI4Mzc4YjMxNzZmMjJjMkBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&src=ZW4udXNhI2hvbGlkYXlAZ3JvdXAudi5jYWxlbmRhci5nb29nbGUuY29t&color=%237986CB&color=%230B8043"
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
