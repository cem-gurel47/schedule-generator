import Link from "next/link";
import { useRouter } from "next/router";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";

const ITEMS = [
  {
    href: "/contact",
    label: "Contact",
  },
  {
    href: "/auth/login",
    label: "Log in",
  },
  {
    href: "/auth/signup",
    label: "Sign Up",
    className:
      "rounded-md bg-secondary py-3 px-6 text-white transition duration-300 hover:opacity-80 hover:text-white",
  },
];

const GuestHeader = () => {
  return (
    <div className="sticky -top-1 left-0 z-10 mb-4 flex justify-center shadow-sm [transform:translateZ(0)]">
      <header className="w-full max-w-6xl py-[0.8125em] px-0 backdrop-blur-sm">
        <div className="navbar flex justify-between">
          <ul className="flex items-center space-x-5">
            <li>
              <Link
                href="/"
                className="btn-ghost btn text-2xl normal-case text-secondary"
              >
                <div className="flex items-center space-x-2">
                  <CalendarDaysIcon className="h-12 w-12" />
                  <p className="bg-gradient-to-b from-violet-900 to-blue-900 bg-clip-text text-4xl text-transparent">
                    Scheduler
                  </p>
                </div>
              </Link>
            </li>
          </ul>
          <ul className="flex items-center space-x-5">
            {ITEMS.map((item) => (
              <ListItem key={item.href} {...item} />
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
};

const ListItem = ({
  href,
  label,
  className,
}: {
  href: string;
  label: string;
  className?: string;
}) => {
  const router = useRouter();
  const { pathname } = router;
  const isActive = (href: string) => {
    if (href === pathname) {
      return "text-primary";
    }
  };
  return (
    <li>
      <Link
        href={href}
        className={`${isActive(
          href
        )} transition duration-200 ease-in-out hover:text-primary ${className}`}
      >
        {label}
      </Link>
    </li>
  );
};

export default GuestHeader;
