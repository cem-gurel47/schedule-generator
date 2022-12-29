import { useState } from "react";
import type { FormEvent } from "react";
import { signIn, useSession } from "next-auth/react";
import { ErrorAlert } from "@components/alert/index";

const Login = () => {
  const session = useSession();
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    const password = formData.get("password");
    const result = await signIn("credentials", {
      email,
      password,
      callbackUrl: "/",
      redirect: false,
    });
    if (result?.error) {
      setError(result.error);
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

          {error && (
            <ErrorAlert
              error="User not found!"
              description="Please check your email."
              setError={setError}
            />
          )}

          <div className="form-control my-3">
            <button className="btn-primary btn">Send login link</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
