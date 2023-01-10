import { useState, useContext } from "react";
import { BusinessContext } from "@contexts/index";
import type { FormEvent } from "react";
import { signIn } from "next-auth/react";
import { SuccessAlert } from "@components/alert/index";
import { XCircleIcon } from "@heroicons/react/24/outline";
import { trpc } from "@utils/trpc";

const SingleEmployeeCreationForm = () => {
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState<undefined | string>();
  const { departments, positions, id } = useContext(BusinessContext);
  const { mutate } = trpc.employees.createEmployee.useMutation();

  const sendMagicLink = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target as HTMLFormElement);

    const email = formData.get("email");
    const name = formData.get("name");
    const department = formData.get("department");
    const position = formData.get("position");

    mutate(
      {
        name: name as string,
        email: email as string,
        department: department as string,
        position: position as string,
        businessId: id,
      },
      {
        onSuccess: async () => {
          const response = await signIn("email", { email, redirect: false });

          if (response) {
            if (response.ok) {
              setIsSuccess(true);
            } else {
              setError(response.error);
            }
          } else {
            setError("There was an error sending the email. Please try again.");
          }
          setLoading(false);
        },
      }
    );
  };

  return (
    <div className="h-full w-1/2">
      <h1 className="mb-2 text-3xl font-bold">Add New Employee</h1>
      <p>
        We will send an email to the employee with a link to set up their
        account. You just need to fill out the information below.
      </p>
      <div className="mt-4 flex w-full">
        <form className="w-full" onSubmit={sendMagicLink}>
          <div className="flex flex-col gap-2">
            <label htmlFor="name">Name</label>
            <input
              required
              type="text"
              name="name"
              id="name"
              className="input-bordered input"
            />
            <label htmlFor="email">Email</label>
            <input
              required
              type="email"
              name="email"
              id="email"
              className="input-bordered input"
            />
          </div>
          {departments.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              <label htmlFor="department">Department</label>
              <select
                required
                name="department"
                id="department"
                className="input-bordered input"
              >
                {departments.map((department) => (
                  <option key={department} value={department}>
                    {department}
                  </option>
                ))}
              </select>
            </div>
          )}
          {positions.length > 0 && (
            <div className="mt-4 flex flex-col gap-2">
              <label htmlFor="position">Position</label>
              <select
                required
                name="position"
                id="position"
                className="input-bordered input"
              >
                {positions.map((position) => (
                  <option key={position} value={position}>
                    {position}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button
            className={`btn-primary btn my-4 ${loading && "loading"}`}
            type="submit"
          >
            Send Employee Sign Up Link
          </button>
          {isSuccess && (
            <SuccessAlert
              title="Success!"
              description="We sent an email to the employee with a link to set up their account."
              actionsContainer={
                <button className="" onClick={() => setIsSuccess(false)}>
                  <XCircleIcon className="h-6 w-6 " />
                </button>
              }
            />
          )}
          {error && <p className="mt-2 text-red-500">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SingleEmployeeCreationForm;
