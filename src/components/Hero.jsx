export default function Hero() {
  return (
    <div
      className="hero min-h-[500px]"
      style={{
        backgroundImage: "url(hero.jpeg)",
      }}
    >
      <div className="hero-overlay bg-opacity-60 bg-black"></div>
      <div className="hero-content text-neutral-content text-center">
        <div className="max-w-md">
          <h1 className="mb-5 text-5xl font-bold text-shadow">
            Welcome to Messiah House
          </h1>
          <p className="mb-5 font-semibold text-3xl text-shadow">
            Growing Together, Changing Lives
          </p>
          <p className="mb-5 text-2xl text-shadow">
            Join us in planting Seeds of Change through love and support.
          </p>
          <button className="btn btn-primary font-bold text-lg shadow-md shadow-black hover:scale-105 hover:shadow-warning duration-300">
            Get Involved
          </button>
        </div>
      </div>
    </div>
  );
}
