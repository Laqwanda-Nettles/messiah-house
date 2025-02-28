import Footer from "@/components/Footer";
import GetInvolvedCTA from "@/components/GetInvolvedCTA";
import Header from "@/components/Header";
import JoinProgramCTA from "@/components/JoinProgramCTA";
import Navbar from "@/components/Navbar";
import Programs from "@/components/Programs";
import Testimonials from "@/components/Testimonials";

export default function Services() {
  return (
    <>
      <Navbar />
      <Header
        title={"Services"}
        subtitle={"Empowering Lives, Building Futures"}
        description={
          "We offer mentorship, financial guidiance, education, and resources to help individuals and communities thrive."
        }
      />
      <Programs />
      <JoinProgramCTA />
      <Testimonials />
      <h2 className="text-4xl font-extrabold text-secondary m-5 pb-6 divider divider-accent">
        Get Involved
      </h2>
      <GetInvolvedCTA />
      <Footer />
    </>
  );
}
