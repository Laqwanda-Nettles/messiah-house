import { useState } from "react";

const testimonialsData = [
  {
    name: "Jordan M.",
    text: "This program changed my life! I gained financial confidence and new skills.",
  },
  {
    name: "Samantha R.",
    text: "The mentorship I received was invaluable. Highly recommend these programs!",
  },
  {
    name: "Carlos D.",
    text: "Housing & Community Development helped me find resources I never knew existed.",
  },
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Go to the next testimonial
  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === testimonialsData.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Go to the previous testimonial
  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonialsData.length - 1 : prevIndex - 1
    );
  };

  return (
    <section className="py-12 px-6 bg-white text-center">
      <h2 className="text-4xl font-bold text-secondary mb-8">
        What Our Participants Say
      </h2>

      <div className="relative w-full max-w-xl mx-auto">
        {/* Testimonial Content */}
        <div className="flex flex-col items-center">
          <p className="text-xl italic text-gray-700 max-w-md">
            "{testimonialsData[currentIndex].text}"
          </p>
          <h3 className="text-primary font-semibold mt-4">
            - {testimonialsData[currentIndex].name}
          </h3>
        </div>

        {/* Navigation Buttons */}
        <div className="absolute inset-y-1/2 flex justify-between w-full px-4">
          <button
            onClick={prevTestimonial}
            className="btn btn-circle btn-sm bg-gray-300 hover:bg-gray-400 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="m4 10l9 9l1.4-1.5L7 10l7.4-7.5L13 1z"
              ></path>
            </svg>
          </button>
          <button
            onClick={nextTestimonial}
            className="btn btn-circle btn-sm bg-gray-300 hover:bg-gray-400"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={20}
              height={20}
              viewBox="0 0 20 20"
            >
              <path
                fill="currentColor"
                d="M7 1L5.6 2.5L13 10l-7.4 7.5L7 19l9-9z"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
