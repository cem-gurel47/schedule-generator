import type { NextPage } from "next";
import { useState } from "react";
import type { FormEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  ManagerSignupFormCard,
  BusinessSignupFormCard,
} from "@components/card/index";
import { trpc } from "@utils/trpc";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";

const SignupPage: NextPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { mutate, data } =
    trpc.auth.createBusinessAndManagerAccount.useMutation();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const businessName = formData.get("businessName");
    if (!email || !password || !businessName) return;

    mutate({
      email: email.toString(),
      password: password.toString(),
      businessName: businessName.toString(),
    });
    if (data) {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      router.push("/dashboard/manager");
    }
    setLoading(false);
  };
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
          <form
            className="grid w-full grid-cols-2 gap-4"
            onSubmit={handleSignUp}
          >
            <BusinessSignupFormCard />
            <ManagerSignupFormCard />
            <div className="col-span-2 mt-4">
              <button
                className={`btn-primary btn ${loading && "loading"}`}
                type="submit"
              >
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
