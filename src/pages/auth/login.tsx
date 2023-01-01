import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { ManagerLoginCard, EmployeeLoginCard } from "@components/card";
import { useSession } from "next-auth/react";

const LoginPage: NextPage = () => {
  const [userType, setUserType] = useState<"manager" | "employee">("manager");
  const { data: session } = useSession();
  console.log(session);

  return (
    <>
      <Head>
        <title>Login | Scheduler</title>
        <meta name="description" content="Login | Scheduler" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container z-[2] mx-auto  flex min-h-screen max-w-6xl flex-col items-center justify-start p-4 text-center">
        <div className="tabs w-full justify-center">
          <a
            className={`tab tab-bordered w-1/4 ${
              userType === "employee" && "tab-active"
            }`}
            onClick={() => {
              setUserType("employee");
            }}
          >
            Employee Login
          </a>
          <a
            className={`tab tab-bordered w-1/4 ${
              userType === "manager" && "tab-active"
            }`}
            onClick={() => {
              setUserType("manager");
            }}
          >
            Manager Login
          </a>
        </div>
        {userType === "manager" ? <ManagerLoginCard /> : <EmployeeLoginCard />}
      </main>
    </>
  );
};

export default LoginPage;
