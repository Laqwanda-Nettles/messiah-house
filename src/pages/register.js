import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import RegisterForm from "@/components/RegisterForm";

export default function Register() {
  return (
    <>
      <title>MHCDC | Register</title>
      <meta
        name="description"
        content="Messiah House Community Development Corporation non-profit portal registeration."
        key="desc"
      />
      <Navbar />
      <RegisterForm />
      <Footer />
    </>
  );
}
