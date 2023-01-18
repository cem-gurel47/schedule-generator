import { useContext } from "react";
import { BusinessContext } from "@contexts/index";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";

const BASE_URL = "/dashboard/employee";

const DashboardEmployeeHeader = () => {
  const router = useRouter();
  const { pathname } = router;
  const { image } = useContext(BusinessContext);

  const isActive = (href: string) => {
    if (`${BASE_URL}${href}` === pathname) {
      return "bg-gradient-to-b from-violet-900 to-blue-900 bg-clip-text text-transparent";
    }
  };

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <div className="navbar pt-4">
      <div className="flex-1">
        <Link
          href={`${BASE_URL}`}
          className="btn-ghost btn text-2xl normal-case text-secondary"
        >
          <div className="flex items-center space-x-2">
            <CalendarDaysIcon className="h-12 w-12 text-purple-900" />
            <p className="bg-gradient-to-b from-violet-900 to-blue-900 bg-clip-text text-4xl text-transparent">
              Scheduler
            </p>
          </div>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0 text-gray-300">
          <li className={isActive("")}>
            <Link href={`${BASE_URL}/`}>Work Schedule</Link>
          </li>
          <li className={isActive("/profile")}>
            <Link href={`${BASE_URL}/profile`}>Profile</Link>
          </li>
          <li className={isActive("/settings")}>
            <Link href={`${BASE_URL}/settings`}>Settings</Link>
          </li>
        </ul>
      </div>
      <div className="dropdown-hover dropdown-end dropdown">
        <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
          <div className="w-10 rounded-full">
            <Image
              src={
                image ||
                "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
              }
              alt="profile"
              layout="fill"
              className="rounded-full"
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
        >
          <li onClick={handleSignOut}>
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardEmployeeHeader;
