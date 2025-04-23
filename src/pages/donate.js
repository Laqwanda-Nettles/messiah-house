import DonationInfo from "@/components/DonationInfo";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function DonatePage() {
  return (
    <>
      <Head>
        <title>MHCDC | Donate</title>
        <meta
          name="description"
          content="Learn how to make a donation to Messiah House Community Development Corporation."
        />
      </Head>
      <Navbar />
      <div className="bg-base-200 min-h-screen p-6">
        <DonationInfo />
      </div>
      <Footer />
    </>
  );
}
