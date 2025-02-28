import { useEffect, useState } from "react";

export default function Programs() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        const data = await response.json();
        setServices(data.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center gap-4 min-h-screen">
        <span className="loading loading-spinner loading-lg text-primary"></span>
        <p className="text-2xl font-bold text-primary animate-pulse">
          Loading Services...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-16 m-5">
      {/* Staggered Sections for Financial Literacy & Housing */}
      {services
        .filter(
          (service) =>
            service.category === "Financial Literacy" ||
            service.category === "Housing & Community Development"
        )
        .map((service, index) => (
          <section
            key={service.category}
            className={`flex flex-col ${
              index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
            } items-center gap-8 px-6 lg:px-16`}
          >
            <img
              src={service.image}
              alt={service.category}
              className="w-full lg:w-1/2 lg:h-96 object-cover rounded-xl shadow-lg"
            />
            <div className="lg:w-1/2 text-center lg:text-left space-y-4">
              <h2 className="text-3xl font-bold text-secondary">
                {service.category}
              </h2>
              <p className="text-gray-700 text-xl italic font-medium">
                {service.description}
              </p>
              <ul className="list-disc list-inside text-gray-600 text-left ml-10 text-lg">
                {service.programs.map((program, i) => (
                  <li key={i}>{program}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}

      {/* Cards for Other Services */}
      <section className="px-6 lg:px-16">
        <div className="flex flex-col lg:flex-row justify-evenly gap-6">
          {services
            .filter(
              (service) =>
                service.category !== "Financial Literacy" &&
                service.category !== "Housing & Community Development"
            )
            .map((service) => (
              <div
                key={service.category}
                className="card bg-base-100 shadow-lg shadow-base-300 w-full"
              >
                <figure>
                  <img
                    src={service.image}
                    alt={service.category}
                    className="h-60 w-full object-cover"
                  />
                </figure>
                <div className="card-body">
                  <h3 className="card-title text-secondary font-bold text-2xl">
                    {service.category}
                  </h3>
                  <p className="text-lg font-medium italic">
                    {service.description}
                  </p>
                  <ul className="list-disc list-inside text-gray-600 text-lg">
                    {service.programs.map((program, i) => (
                      <li key={i}>{program}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
        </div>
      </section>
    </div>
  );
}
