import Link from "next/link";

export default function Navbar() {
  return (
    <div className="navbar bg-info flex">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-black max-w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="font-semibold menu menu-lg dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link href={"/services"}>Services</Link>
            </li>
            <li>
              <Link href={"/events"}>Events</Link>
            </li>
            <li>
              <Link href={"/about"}>About Us</Link>
            </li>
          </ul>
        </div>
        <Link href={"/"} className="btn btn-ghost">
          <img
            src="/logo.jpg"
            alt="logo"
            className="max-w-32 lg:max-w-40 rounded-md "
          />
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="text-lg font-bold menu menu-horizontal px-1">
          <li>
            <Link href={"/services"}>Services</Link>
          </li>
          <li>
            <Link href={"/events"}>Events</Link>
          </li>
          <li>
            <Link href={"/about"}>About Us</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-end">
        <a className="btn btn-warning font-bold text-md max-w-32 lg:text-lg lg:max-w-40">
          Donate Now
        </a>
      </div>
    </div>
  );
}
