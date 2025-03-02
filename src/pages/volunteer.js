import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import VolunteerForm from "@/components/VolunteerForm";
import Head from "next/head";

export default function Volunteer() {
  return (
    <>
      <Head>
        <title>Volunteer</title>
        <meta
          name="description"
          content="Messiah House Community Development Corporation non-profit Volunteer Signup."
          key="desc"
        />
      </Head>
      <Navbar />
      <div className="bg-base-200 p-6">
        <VolunteerForm />
      </div>
      <Footer />
    </>
  );
}
