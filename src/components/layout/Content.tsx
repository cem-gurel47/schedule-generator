import type { ReactNode } from "react";
import { useContext, useEffect, useState } from "react";
import { BusinessContext } from "@contexts/index";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { CompleteAccountAlert } from "@components/alert/index";
import Loading from "@components/container/Loading";

type Props = {
  children: ReactNode;
};

function Content({ children }: Props) {
  const router = useRouter();
  const { data, status } = useSession();
  const { isLoading, image, openingHours, closingHours } =
    useContext(BusinessContext);
  const developmentEnv = process.env.NODE_ENV === "development";
  const [showCompleteAccountAlert, setShowCompleteAccountAlert] =
    useState(false);

  useEffect(() => {
    if (!developmentEnv) {
      if (
        status === "unauthenticated" &&
        router.pathname.includes("dashboard")
      ) {
        router.push("/auth/login");
      }
    }
    if (status === "authenticated" && !router.pathname.includes("dashboard")) {
      if (data.user?.role === "manager") {
        router.push("/dashboard/manager");
      } else {
        router.push("/dashboard/employee");
      }
    }
    if (
      status === "authenticated" &&
      data.user?.role === "employee" &&
      router.pathname.includes("manager")
    ) {
      router.push("/dashboard/employee");
    }
  }, [data, status, router, developmentEnv]);

  useEffect(() => {
    if (
      data?.user?.role === "manager" &&
      (!image || openingHours.length === 0 || closingHours.length === 0)
    ) {
      setShowCompleteAccountAlert(true);
    } else {
      setShowCompleteAccountAlert(false);
    }
  }, [closingHours.length, data, image, openingHours]);

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="relative z-[2] flex min-h-screen flex-col px-6">
      {children}
      {showCompleteAccountAlert && <CompleteAccountAlert />}
    </div>
  );
}

export default Content;
