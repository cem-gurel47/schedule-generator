import { useContext, useState } from "react";
import { BusinessContext } from "@contexts/index";
import { TrashIcon, PencilSquareIcon } from "@heroicons/react/24/solid";
import { trpc } from "@utils/trpc";

type Props = {
  name: string;
};

const DepartmentCard = (props: Props) => {
  const { setDepartments } = useContext(BusinessContext);
  const { mutate, isLoading } = trpc.business.deleteDepartment.useMutation();
  const { mutate: mutateDepartment, isLoading: isEditDepartmentLoading } =
    trpc.business.editDepartment.useMutation();
  const [isEditMode, setIsEditMode] = useState(false);

  const deleteDepartment = () => {
    mutate(
      {
        name: props.name,
      },
      {
        onSuccess: (data) => {
          setDepartments(data.departments);
        },
      }
    );
  };

  const editDepartment = (departmentName: string) => {
    mutateDepartment(
      {
        oldName: props.name,
        newName: departmentName,
      },
      {
        onSuccess: (data) => {
          setDepartments(data.departments);
          setIsEditMode(false);
        },
      }
    );
  };

  if (isEditMode) {
    return (
      <div className="card bg-base-200">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target as HTMLFormElement);
            const departmentName = formData.get("newDepartmentName");
            if (!departmentName) {
              return;
            }
            editDepartment(departmentName as string);
          }}
        >
          <input
            autoFocus
            name="newDepartmentName"
            required
            defaultValue={props.name}
            type="text"
            className="input w-full"
            placeholder="New Department Name"
          />
          <div className="mt-2 grid grid-cols-2 gap-1">
            <button
              className={`btn-outline btn-primary btn col-span-1${
                isEditDepartmentLoading && "loading"
              }`}
              type="submit"
            >
              Save
            </button>
            <button
              className="btn-outline btn-error btn col-span-1"
              onClick={() => setIsEditMode(false)}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="card relative w-full rounded-md bg-base-200">
      <div className="absolute top-1 right-1 flex">
        <button
          className="btn-ghost btn-sm btn-circle btn"
          onClick={() => setIsEditMode(true)}
        >
          <PencilSquareIcon className="h-5 w-5" />
        </button>

        {isLoading ? (
          <button className="loading btn-sm btn-circle btn" />
        ) : (
          <button
            className="btn-ghost btn-sm btn-circle btn"
            onClick={deleteDepartment}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        )}
      </div>
      <div className="card-body flex items-center justify-center">
        <h2 className="card-title ">{props.name}</h2>
      </div>
    </div>
  );
};

export default DepartmentCard;
