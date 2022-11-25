import GuestHeader from "./GuestHeader";
import DashboardHeader from "./DashboardHeader";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const { pathname } = router;

  if (pathname.includes("/dashboard")) {
    return <DashboardHeader />;
  }
  return <GuestHeader />;
};

export default Header;
