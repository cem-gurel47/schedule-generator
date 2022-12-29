import Image from "next/image";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";
import { CalendarDaysIcon } from "@heroicons/react/20/solid";

const BASE_URL = "/dashboard/employee";

const DashboardEmployeeHeader = () => {
  const router = useRouter();
  const { pathname } = router;

  const isActive = (href: string) => {
    if (`${BASE_URL}${href}` === pathname) {
      return "text-primary";
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/auth/login");
  };

  return (
    <div className="navbar pt-4">
      <div className="flex-1">
        <Link
          href={`${BASE_URL}`}
          className="btn-ghost btn text-2xl normal-case text-secondary"
        >
          <div className="flex items-center space-x-2">
            <CalendarDaysIcon className="h-12 w-12" />
            <p>Scheduler</p>
          </div>
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal p-0">
          <li className={isActive("")}>
            <Link href={`${BASE_URL}/`}>Work Schedule</Link>
          </li>
          {/* <li className="dropdown-hover dropdown">
            <div className="indicator">
              {data && data > 0 && (
                <span className="badge-secondary badge indicator-item">
                  +{data}
                </span>
              )}

              <a className="flex">
                Shift Changes{" "}
                <svg
                  className="fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                >
                  <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                </svg>
              </a>
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content menu rounded-box w-52 bg-base-100 p-2 shadow"
            >
              <li>
                <Link href={`${BASE_URL}/shift-changes`}>Shift Changes</Link>
              </li>
              <li>
                <Link href={`${BASE_URL}/shift-swaps`}>Shift Swaps</Link>
              </li>
              <li>
                <Link href={`${BASE_URL}/shift-cancels`}>Shift Cancels</Link>
              </li>
            </ul>
          </li> */}
        </ul>
      </div>
      <div className="dropdown-hover dropdown-end dropdown">
        <label tabIndex={0} className="btn-ghost btn-circle avatar btn">
          <div className="w-10 rounded-full">
            <Image
              src="https://placeimg.com/80/80/people"
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
            <a>Logout</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardEmployeeHeader;
