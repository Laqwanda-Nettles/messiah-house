import Link from "next/link";

export default function GetInvolvedCTA() {
  return (
    <div
      className="hero min-h-60"
      style={{
        backgroundImage: "url(/community-cta.jpg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content flex flex-wrap">
        <div className="card bg-base-100 max-w-96 h-60 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Volunteer</h2>
            <p className="text-lg">
              Join us in making a difference. Your time and skils can change
              lives.
            </p>
            <div className="card-actions justify-center">
              <Link href={"/volunteer"} className="btn btn-accent">
                Volunteer Now
              </Link>
            </div>
          </div>
        </div>
        <div className="card bg-base-100 max-w-96 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Donate</h2>
            <p className="text-lg">
              Your generosity fuels our mission. Every contribution helps us
              support those in need.
            </p>
            <div className="card-actions justify-center">
              <button className="btn btn-warning">Donate Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
