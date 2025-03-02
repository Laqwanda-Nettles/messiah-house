import Footer from "@/components/Footer";
import GalleryDisplay from "@/components/GalleryDisplay";
import Navbar from "@/components/Navbar";
import Head from "next/head";

export default function GalleryPage() {
  return (
    <>
      <Head>
        <title>Gallery</title>
        <meta
          name="description"
          content="Messiah House Community Development Corporation non-profit photo gallery."
          key="desc"
        />
      </Head>
      <Navbar />
      <h2 className="my-10 divider divider-accent text-4xl font-extrabold text-secondary">
        Our Community
      </h2>
      <GalleryDisplay />
      <Footer />
    </>
  );
}
