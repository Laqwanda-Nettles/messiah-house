export default function Header({ title, subtitle, description }) {
  return (
    <div className="text-center bg-base-200 p-5">
      <h1 className="text-4xl font-extrabold text-secondary mb-4">{title}</h1>
      <h2 className="text-2xl text-neutral font-bold italic">{subtitle}</h2>
      <p className="text-xl">{description}</p>
    </div>
  );
}
