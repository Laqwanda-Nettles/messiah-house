import Link from "next/link";

export default function DonationInfo() {
  return (
    <div className="bg-white p-6 max-w-2xl mx-auto shadow-md rounded-lg my-10">
      <h1 className="text-3xl font-bold text-success mb-4 text-center">
        Thank You for Your Support!
      </h1>
      <p className="text-xl text-gray-700 text-center">
        At this time, we are not accepting online donations.
        <br />
        <br />
        If you would like to make a donation in person or by mail, please
        contact us or give us a call:
        <br />
        <br />
        📞 <span className="font-semibold">(225) 460-0250</span>
        <br />
        📬 Use our{" "}
        <Link
          href="/about#contact"
          className="text-primary font-medium underline"
        >
          contact form
        </Link>{" "}
        to reach out.
        <br />
        <br />
        We sincerely appreciate your generosity and support!
      </p>
    </div>
  );
}
