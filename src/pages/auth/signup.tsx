import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import {
  ManagerSignupFormCard,
  BusinessSignupFormCard,
} from "@components/card/index";
import {} from "next-auth/react";

const SignupPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Singup | Scheduler</title>
        <meta name="description" content="Signup | Scheduler" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container z-[2] mx-auto  flex min-h-screen max-w-6xl flex-col items-center p-4 text-center">
        <section className="w-full">
          <h1 className="text-4xl font-bold">Signup</h1>
          <p className="mt-2 text-sm text-gray-500">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-blue-500">
              Login
            </Link>
          </p>
          <form className="grid w-full grid-cols-2 gap-4">
            <BusinessSignupFormCard />
            <ManagerSignupFormCard />
            <div className="col-span-2 mt-4">
              <button className="btn-primary btn">
                <span>Signup</span>
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default SignupPage;
