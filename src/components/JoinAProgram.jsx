import Link from "next/link";

export default function JoinAProgram() {
  return (
    <section className="border-t-4 border-primary py-12 px-6 text-center bg-gray-100 mt-16">
      <h2 className="text-3xl font-bold text-primary">
        Ready to Transform Your Future?
      </h2>
      <p className="text-gray-600 mt-4 text-xl">
        Join one of our programs today and take the next step towards personal
        and professional growth.
      </p>
      <Link
        href={"/program"}
        className="btn btn-primary mt-6 px-6 py-3 text-lg"
      >
        Join A Program
      </Link>
    </section>
  );
}
