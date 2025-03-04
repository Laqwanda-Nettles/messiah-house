import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import Founder from "@/components/Founder";
import GetInvolvedCTA from "@/components/GetInvolvedCTA";
import Header from "@/components/Header";
import MissionSection from "@/components/MissionSection";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function About() {
  return (
    <>
      <Head>
        <title>MHCDC | About Us</title>
        <meta
          name="description"
          content="Messiah House Community Development Corporation non-profit about, mission, and vision statements."
          key="desc"
        />
      </Head>
      <Navbar />
      <Header
        title={"About Us"}
        subtitle={"Serving with Purpose"}
        description={`Messiah's House Community Development Corporation is dedicated to transforming lives through mentorship, financial literacy, housing support, and education.`}
      />

      <MissionSection />
      <Founder />

      <div id="contact" className="bg-base-200 p-6">
        <ContactForm />
      </div>
      <GetInvolvedCTA />
      <Footer />
    </>
  );
}
