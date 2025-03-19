import Footer from "@/components/Footer";
import LoginForm from "@/components/LoginForm";
import Navbar from "@/components/Navbar";

export default function Login() {
  return (
    <>
      <title>MHCDC | Login</title>
      <meta
        name="description"
        content="Messiah House Community Development Corporation non-profit portal login."
        key="desc"
      />
      <Navbar />
      <LoginForm />
      <Footer />
    </>
  );
}
