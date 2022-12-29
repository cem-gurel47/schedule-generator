import type { ReactNode } from "react";
import { useContext, useEffect } from "react";
import { BusinessContext } from "@contexts/index";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Loading from "@components/container/Loading";

type Props = {
  children: ReactNode;
};

function Content({ children }: Props) {
  const router = useRouter();
  const { data, status } = useSession();
  const { isLoading } = useContext(BusinessContext);
  const developmentEnv = process.env.NODE_ENV === "development";

  useEffect(() => {
    if (!developmentEnv) {
      if (
        status === "unauthenticated" &&
        router.pathname.includes("dashboard")
      ) {
        router.push("/auth/login");
      }

      if (
        status === "authenticated" &&
        !router.pathname.includes("dashboard")
      ) {
        if (data.user?.role === "manager") {
          router.push("/dashboard/manager");
        } else {
          router.push("/dashboard/employee");
        }
      }
    }
  }, [data, status, router, developmentEnv]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="z-[2] flex min-h-screen flex-col px-6">{children}</div>
  );
}

export default Content;
