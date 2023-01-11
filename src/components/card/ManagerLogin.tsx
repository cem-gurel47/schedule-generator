import { useState } from "react";
import Link from "next/link";
import type { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { ErrorAlert } from "@components/alert/index";

const Login = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");
    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/dashboard/manager",
    });
    if (!result) {
      setError("Something went wrong");
      setLoading(false);
      return;
    }
    if (result.error) {
      setError(result.error);
    }
    if (result.ok) {
      console.log(result);
      // router.push("/dashboard/manager");
    }
    setLoading(false);
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

          <div className="form-control mt-4">
            <button className={`btn-primary btn ${loading && "loading"}`}>
              Login
            </button>
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
