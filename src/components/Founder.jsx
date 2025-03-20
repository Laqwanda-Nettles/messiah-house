export default function Founder() {
  return (
    <>
      <h2 className="text-center text-4xl text-secondary font-bold mb-5 divider divider-accent">
        Meet the Founder
      </h2>
      <div className="mb-10 bg-[#f5ebe0] p-6 flex flex-col md:flex-row justify-evenly gap-10 items-center w-full">
        <div className="flex flex-col items-center sm:w-full md:w-1/2">
          <h3 className="text-3xl font-bold text-accent text-center">
            Wanda Jones Coston
          </h3>
          <p className="font-semibold italic text-2xl text-zinc-500 mb-4">
            Founder
          </p>
          <img
            src="/founder.jpeg"
            alt="founder of MHCDC"
            className="object-cover w-96 h-96 rounded-badge mb-6"
          />
        </div>
        <div className="sm:w-full md:w-1/2">
          <p className="text-xl">
            <span className="font-medium">Wanda Y. Jones Coston</span> is the
            Founder of{" "}
            <span className="font-medium">
              Messiah&apos;s House Community Development Corporation
            </span>
            , dedicated to providing housing, education, and financial
            empowerment to low-income communities. A former Executive Director
            of Housing, she has led large-scale housing programs and received
            multiple awards for her contributions.
          </p>
          <p className="text-xl mt-3">
            She also owns{" "}
            <span className="font-medium">
              Fresh Start Transitional Housing
            </span>
            , helping formerly incarcerated women rebuild their lives. As an
            educator, she teaches financial literacy and business development.
            Wanda founded the{" "}
            <span className="font-medium">Blue Chics Foundation</span> to
            support women and serves as the{" "}
            <span className="font-medium">
              Founding Pastor of The Messiah's House Church
            </span>
            . An accomplished author, entrepreneur, and recipient of the{" "}
            <span className="font-medium">
              Presidential Lifetime Achievement Award
            </span>
            , she continues to drive faith-based and economic empowerment
            initiatives. She is also completing her{" "}
            <span className="font-medium">Doctorate in Theology</span> this
            year.
          </p>
        </div>
      </div>
    </>
  );
}
