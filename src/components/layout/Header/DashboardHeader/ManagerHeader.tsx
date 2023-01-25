import { useContext } from "react";
import { BusinessContext } from "@contexts/index";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";
import { signOut } from "next-auth/react";

const BASE_URL = "/dashboard/manager";

const DashboardManagerHeader = () => {
  const { image } = useContext(BusinessContext);
  const router = useRouter();
  const { pathname } = router;

  const isActive = (href: string) => {
    if (`${BASE_URL}${href}` === pathname) {
      return "text-primary";
    }
  };

  const handleSignOut = async () => {
    await signOut({
      callbackUrl: "/",
    });
  };

  return (
    <div className="navbar pt-4 shadow-md">
      <div className="flex-1">
        <Link
          href={`${BASE_URL}`}
          className="btn-ghost btn text-2xl normal-case"
        >
          <div className="flex items-center space-x-2">
            <CalendarDaysIcon className="h-12 w-12 text-secondary" />
            <p className="text-secondary">Scheduler</p>
          </div>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li className={isActive("")}>
            <Link href={`${BASE_URL}/`}>Work Schedule</Link>
          </li>
          <li className={isActive("/constraints")}>
            <Link href={`${BASE_URL}/constraints`}>Constraints</Link>
          </li>
          <li className={isActive("/employees")}>
            <Link href={`${BASE_URL}/employees`}>Employees</Link>
          </li>
          <li className={isActive("/management")}>
            <Link href={`${BASE_URL}/management`}>Management</Link>
          </li>
        </ul>
      </div>
      <div className="dropdown-hover dropdown-end dropdown">
        <label
          tabIndex={0}
          className="btn-ghost btn-circle avatar btn  border-2 hover:border-primary"
        >
          <div className="w-10 rounded-full ">
            <Image
              src={
                image ||
                "https://t3.ftcdn.net/jpg/04/34/72/82/240_F_434728286_OWQQvAFoXZLdGHlObozsolNeuSxhpr84.jpg"
              }
              alt="profile"
              layout="fill"
              className="mask mask-squircle"
            />
          </div>
        </label>
        <ul
          tabIndex={0}
          className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
        >
          <li>
            <a className="justify-between">
              Profile
              <span className="badge">New</span>
            </a>
          </li>
          <li>
            <Link href={`${BASE_URL}/settings`}>Settings</Link>
          </li>
          <li onClick={handleSignOut}>
            <a>Sign Out</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardManagerHeader;
