import type { ButtonHTMLAttributes } from "react";
import { useState, useContext } from "react";
import { BusinessContext } from "@contexts/index";
import { PlusCircleIcon } from "@heroicons/react/24/solid";
import { trpc } from "@utils/trpc";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "department" | "position";
}

const Add = (props: Props) => {
  const { setDepartments, setPositions } = useContext(BusinessContext);
  const { mutate: mutateDepartment, isLoading: isDepartmentLoading } =
    trpc.business.addNewDepartment.useMutation();
  const { mutate: mutatePosition, isLoading: isPositionLoading } =
    trpc.business.addNewPosition.useMutation();

  const [inputMode, setInputMode] = useState(false);

  const handleAddNew = () => {
    setInputMode(true);
  };

  const addNew = (name: string) => {
    if (props.variant === "department") {
      mutateDepartment(
        {
          name,
        },
        {
          onSuccess: (data) => {
            setDepartments(data.departments);
            setInputMode(false);
          },
        }
      );
    } else {
      mutatePosition(
        {
          name,
        },
        {
          onSuccess: (data) => {
            setPositions(data.positions);
            setInputMode(false);
          },
        }
      );
    }
  };

  if (inputMode) {
    return (
      <div className="card bg-base-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const name = formData.get("name");
            if (!name) {
              return;
            }
            addNew(name as string);
          }}
        >
          <input
            autoFocus
            name="name"
            required
            type="text"
            className="input w-full"
            placeholder="Department Name"
          />
          <div className="mt-2 grid grid-cols-2 gap-1">
            <button
              className={`btn-outline btn-primary btn col-span-1${
                (isDepartmentLoading || isPositionLoading) && "loading"
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
      onClick={handleAddNew}
    >
      <PlusCircleIcon className="h-12 w-12" />
    </button>
  );
};

export default Add;
