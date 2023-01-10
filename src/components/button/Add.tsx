import type { ButtonHTMLAttributes } from "react";
import { useState, useContext } from "react";
import { BusinessContext } from "@contexts/index";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { trpc } from "@utils/trpc";

const Add = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const { setDepartments } = useContext(BusinessContext);
  const { mutate, isLoading } = trpc.business.addNewDepartment.useMutation();
  const [inputMode, setInputMode] = useState(false);

  const handleAddNewDepartment = () => {
    setInputMode(true);
  };

  const addNewDepartment = (departmentName: string) => {
    console.log(departmentName);
    mutate(
      {
        name: departmentName,
      },
      {
        onSuccess: (data) => {
          setDepartments(data.departments);
          setInputMode(false);
        },
      }
    );
  };

  if (inputMode) {
    return (
      <div className="card bg-base-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const departmentName = formData.get("departmentName");
            if (!departmentName) {
              return;
            }
            addNewDepartment(departmentName as string);
          }}
        >
          <input
            autoFocus
            name="departmentName"
            required
            type="text"
            className="input w-full"
            placeholder="Department Name"
          />
          <div className="mt-2 grid grid-cols-2 gap-1">
            <button
              className={`btn-outline btn-primary btn col-span-1${
                isLoading && "loading"
              }`}
              type="submit"
            >
              Add
            </button>
            <button
              className="btn-outline btn-error btn col-span-1"
              onClick={() => setInputMode(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <button
      {...props}
      className="btn-ghost btn-block btn h-auto rounded-md bg-base-200 py-6"
      onClick={handleAddNewDepartment}
    >
      <PlusCircleIcon className="h-12 w-12" />
    </button>
  );
};

export default Add;
