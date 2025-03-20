import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthProvider";

const facebookUrl = process.env.FACEBOOK_URL;

export default function Footer() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

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
        console.error("Error fetching services:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <>
      <footer className="footer bg-info text-base-content p-10 font-semibold">
        <nav>
          <h6 className="footer-title font-bold">Services</h6>
          {loading ? (
            <p className="text-sm">Loading services...</p>
          ) : (
            services.map((service, index) => (
              <Link
                key={index}
                href={`/services#${service.category
                  .toLowerCase()
                  .replace(/\s+/g, "-")}`}
                className="link link-hover"
                scroll={false}
              >
                {service.category}
              </Link>
            ))
          )}
        </nav>
        <nav>
          <h6 className="footer-title font-bold">Company</h6>
          <Link href={"/about"} className="link link-hover">
            About us
          </Link>
          <Link href={"/about#contact"} className="link link-hover">
            Contact
          </Link>
          <Link
            href={user ? "/admin/portal" : "/login"}
            className="link link-hover"
          >
            MHCDC Portal
          </Link>
        </nav>
        <nav>
          <h6 className="footer-title font-bold">Contact</h6>
          <address>
            138 NE Central Avenue <br />
            Amite, LA 70422 <br />
            (225) 460-0250
          </address>
        </nav>
      </footer>
      <footer className="footer bg-info text-base-content border-base-300 border-t px-10 py-4">
        <aside className="grid-flow-col items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12.75 3.94c1-.72 2.16-1.08 3.47-1.08c.72 0 1.51.19 2.37.59q1.29.585 2.04 1.38c1.03 1.28 1.46 2.77 1.31 4.47c-.16 1.7-.72 3.03-1.69 3.97l-7.59 7.59c-.19.19-.43.28-.71.28s-.51-.09-.7-.28a.94.94 0 0 1-.28-.7c0-.28.09-.52.28-.71l4.59-4.59c.25-.22.25-.45 0-.7s-.48-.25-.7 0l-4.59 4.59a.95.95 0 0 1-.71.28c-.28 0-.51-.09-.7-.28a.94.94 0 0 1-.28-.7c0-.28.09-.52.28-.71l4.59-4.59q.405-.375 0-.75c-.23-.25-.45-.25-.7 0l-4.59 4.64a.98.98 0 0 1-.71.28c-.28 0-.52-.09-.73-.28c-.2-.19-.3-.42-.3-.7q0-.42.33-.75l4.6-4.6c.25-.25.25-.48 0-.7s-.49-.22-.71 0L6.28 14.5c-.22.2-.45.31-.7.31c-.28 0-.52-.1-.7-.31c-.19-.2-.29-.44-.29-.72s.1-.51.29-.7C7.94 10 9.83 8.14 10.55 7.45l3.56 3.52c.39.37.84.56 1.39.56c.7 0 1.25-.28 1.66-.84c.28-.41.38-.86.3-1.36s-.29-.92-.63-1.27zm2.06 6.33L10.55 6l-7.08 7.08c-.84-.85-1.32-2.15-1.43-3.92c-.11-1.76.37-3.29 1.43-4.57c1.19-1.18 2.61-1.78 4.26-1.78c1.66 0 3.07.6 4.22 1.78l4.27 4.27c.19.19.28.42.28.7s-.09.52-.28.71c-.19.18-.42.28-.72.28c-.27 0-.5-.1-.69-.28"
            ></path>
          </svg>
          <p className="font-semibold">
            &copy; {new Date().getFullYear()} Messiah Community Development
            Corporation. All rights reserved.
          </p>
        </aside>
        <nav className="md:place-self-center md:justify-self-end">
          <div className="grid grid-flow-col gap-4">
            <a href={facebookUrl}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
}
