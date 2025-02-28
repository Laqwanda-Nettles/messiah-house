import Footer from "@/components/Footer";
import GalleryDisplay from "@/components/GalleryDisplay";
import Navbar from "@/components/Navbar";

export default function GalleryPage() {
  return (
    <>
      <Navbar />
      <h2 className="m-10 divider divider-accent text-4xl font-extrabold text-secondary">
        Our Community
      </h2>
      <GalleryDisplay />
      <Footer />
    </>
  );
}
