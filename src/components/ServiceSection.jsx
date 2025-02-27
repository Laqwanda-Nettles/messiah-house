import { useEffect, useState } from "react";
import HoverCard from "./HoverCard";
import Link from "next/link";

export default function ServiceSection() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");

        if (!response.ok) {
          throw new Error("Failed to fetch services");
        }

        const data = await response.json();
        setServices(data.services);
      } catch (error) {
        console.error("Error fetching services: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <section className="py-10 bg-base-200 flex flex-col items-center gap-5">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-extrabold text-4xl text-center text-secondary mb-6">
          Our Services
        </h2>
        <p className="text-base-content text-xl font-semibold mb-10">
          Explore the programs and support we offer to help individuals and
          communities thrive.
        </p>
      </div>

      {loading ? (
        <p className="flex justify-center items-center gap-4 font-semibold text-center text-2xl text-secondary animate-pulse ">
          <span className="loading loading-infinity loading-lg text-info"></span>
          Loading services...
        </p>
      ) : (
        <div className="flex flex-wrap justify-center items-center gap-8 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <HoverCard
              key={index}
              imageSrc={service.image}
              title={service.category}
              details={service.description}
            />
          ))}
        </div>
      )}
      <Link
        href={"/services"}
        className="btn btn-secondary hover:scale-105 text-lg mt-4"
      >
        Learn More
      </Link>
    </section>
  );
}
