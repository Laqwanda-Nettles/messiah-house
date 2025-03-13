import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import ProgramSignupForm from "@/components/ProgramSignupForm";
import Head from "next/head";

export default function Program() {
  return (
    <>
      <Head>
        <title>MHCDC | Join A Program</title>
        <meta
          name="description"
          content="Messiah House Community Development Corporation non-profit Program Signup."
          key="desc"
        />
      </Head>
      <Navbar />
      <div className="bg-base-200 p-6">
        <ProgramSignupForm />
      </div>
      <Footer />
    </>
  );
}
