import Link from "next/link";

const GuestHeader = () => {
  return (
    <div className="sticky -top-1 left-0 z-10 mb-4 flex justify-center shadow-sm [transform:translateZ(0)]">
      <header className="w-full max-w-6xl py-[0.8125em] px-0 backdrop-blur-sm">
        <div className="navbar flex justify-between">
          <ul className="flex items-center space-x-5">
            <li>
              <Link
                href="/"
                className="text-3xl font-bold text-secondary transition duration-300 hover:text-white"
              >
                Scheduler
              </Link>
            </li>
          </ul>
          <ul className="flex items-center space-x-5">
            <li>
              <a>Contact</a>
            </li>
            <li>
              <a className="">Log in</a>
            </li>
            <li>
              <Link
                href="/dashboard/manager"
                className="rounded-md bg-secondary py-3 px-6 text-white transition duration-300 hover:bg-secondary"
              >
                Sign up
              </Link>
            </li>
          </ul>
        </div>
      </header>
    </div>
  );
};

export default GuestHeader;
