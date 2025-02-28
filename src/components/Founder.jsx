export default function Founder() {
  return (
    <div className="bg-[#f5ebe0] p-6 flex flex-col md:flex-row justify-evenly gap-5 items-center w-full">
      <div className="flex flex-col items-center w-1/2">
        <h2 className="text-3xl font-bold text-accent text-center">
          Wanda Jones Coston
        </h2>
        <p className="font-semibold italic text-2xl text-zinc-500 mb-4">
          Founder
        </p>
        <img
          src="/founder.jpeg"
          alt="founder of MHCDC"
          className="object-cover w-96 h-96 rounded-badge mb-6"
        />
      </div>
      <div className="w-1/2">
        <p className="font-medium text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          sollicitudin condimentum diam, eu scelerisque ligula finibus vel.
          Nullam placerat accumsan velit tincidunt dignissim. In hac habitasse
          platea dictumst. Maecenas tellus nulla, placerat sit amet maximus
          eget, placerat sit amet massa. Vivamus nec fermentum leo. Vestibulum a
          placerat metus, ac pretium urna. Pellentesque id libero massa. Sed id
          diam elit. Nunc sit amet sodales arcu.
        </p>
      </div>
    </div>
  );
}
