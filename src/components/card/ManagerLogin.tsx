import { useState } from "react";
import Link from "next/link";
import type { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { ErrorAlert } from "@components/alert/index";

const Login = () => {
  const [error, setError] = useState<string | undefined>(undefined);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");
    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (!result) {
      setError("Something went wrong");
      return;
    }
    if (result.error) {
      setError(result.error);
    }
    if (result.ok) {
      console.log(result);
      // router.push("/dashboard/manager");
    }
  };

  return (
    <div className="card w-1/2 rounded-2xl bg-base-100 p-4 shadow-2xl">
      <div className="card-body">
        <form onSubmit={handleLogin}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              name="email"
              required
              type="email"
              placeholder="Email"
              className="input-bordered input"
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              name="password"
              required
              type="password"
              placeholder="Password"
              className="input-bordered input"
            />
          </div>
          {error && (
            <ErrorAlert
              error="Invalid Credentials!"
              description="Please check your email and password."
              setError={setError}
            />
          )}
          <div className="form-control my-1">
            <label className="label cursor-pointer justify-start gap-4">
              <input type="checkbox" className="checkbox" />
              <span className="label-text-alt">Remember me</span>
            </label>
          </div>
          <div className="form-control">
            <button className="btn-primary btn">Login</button>
          </div>
          <div className="form-control">
            <Link
              href="/auth/forgot-password"
              className="label-text-alt mt-3 self-start"
            >
              Forgot password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
