import type { NextPage } from "next";
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
  const { mutate, isLoading } =
    trpc.auth.createBusinessAndManagerAccount.useMutation();

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();
    const name = formData.get("name")?.toString();
    const businessName = formData.get("businessName");
    if (!email || !password || !businessName || !name) return;

    mutate(
      {
        name: name.toString(),
        email: email.toString(),
        password: password.toString(),
        businessName: businessName.toString(),
      },
      {
        onSuccess: async (data) => {
          await signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          });
          router.push("/");
        },
      }
    );
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
                className={`btn-primary btn ${isLoading && "loading"}`}
                type="submit"
              >
                Signup
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
};

export default SignupPage;
