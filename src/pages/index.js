import Footer from "@/components/Footer";
import GetInvolvedCTA from "@/components/GetInvolved";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ServiceSection from "@/components/ServiceSection";
import Head from "next/head";
import { useEffect } from "react";

const BACKENDURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function Home() {
  // wake up the backend
  useEffect(() => {
    fetch(`${BACKENDURL}/api/hello`);
  }, []);

  return (
    <div>
      <Head>
        <title>Messiah&apos;s House CDC</title>
        <meta
          name="description"
          content="Messiah House Community Development Corporation non-profit home page."
          key="desc"
        />
      </Head>
      <Navbar />
      <Hero />
      <div className="m-5">
        <h2 className="font-extrabold text-4xl text-center text-secondary">
          Our Mission
        </h2>
        <p className="text-xl my-4">
          At{" "}
          <span className="italic font-semibold text-secondary">
            Messiah&apos;s House Communtiy Development Corporation
          </span>
          , we are committed to uplifting individuals and families through
          mentorship, financial education, career development, and affordable
          housing initiatives. By providing the resources, skills, and
          opportunities needed to thrive, we help create pathways to economic
          independence and lasting success. Through our community-driven
          programs, we plant Seeds of Change, ensuring that everyone we serve
          has the support and foundation to grow.
        </p>
      </div>
      <ServiceSection />
      <h2 className="text-4xl font-extrabold text-secondary text-center m-5">
        Get Involved
      </h2>
      <GetInvolvedCTA />
      <Footer />
    </div>
  );
}
