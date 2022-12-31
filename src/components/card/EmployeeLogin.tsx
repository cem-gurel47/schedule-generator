import { useState } from "react";
import type { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { ErrorAlert, SuccessAlert } from "@components/alert/index";

const EmployeeLogin = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const email = formData.get("email");
    const result = await signIn("email", {
      email,
      redirect: false,
    });
    if (result) {
      if (result.ok) {
        setIsSuccess(true);
      } else {
        setError(result.error);
      }
    } else {
      setError("There was an error sending the email. Please try again.");
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

          <div className="form-control my-4">
            <button className={`btn-primary btn ${loading && "loading"}`}>
              Send login link
            </button>
          </div>
          {isSuccess && (
            <SuccessAlert
              title="Email sent!"
              description="You can sign in with the link in the email."
            />
          )}

          {error && (
            <ErrorAlert
              error="User not found!"
              description="Please check your email."
              setError={setError}
            />
          )}
        </form>
      </div>
    </div>
  );
};

export default EmployeeLogin;
