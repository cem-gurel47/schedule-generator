import { useState, useContext } from "react";
import { ConstraintContext } from "@contexts/index";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import type { Constraint } from "@models/types";
import { trpc } from "@utils/trpc";
import moment from "moment";
import UpdateConstraint from "./AddConstraintRow";

type Props = {
  constraintObject: Constraint;
};

const formatType = (type: string) => {
  if (type === "MIN") {
    return "Minimum";
  } else if (type === "MAX") {
    return "Maximum";
  } else {
    return "Exactly";
  }
};

const ConstraintRow = ({ constraintObject }: Props) => {
  const { setConstraints, constraints } = useContext(ConstraintContext);
  const [isEditing, setIsEditing] = useState(false);
  const { mutate: deleteConstraint, isLoading } =
    trpc.constraint.deleteConstraint.useMutation();

  const { id, type, constraint, start, end, dayOfWeek, department, position } =
    constraintObject;

  const handleDelete = () => {
    deleteConstraint(
      { id },
      {
        onSuccess: () => {
          const newConstraints = constraints.filter(
            (constraint) => constraint.id !== id
          );
          setConstraints(newConstraints);
        },
      }
    );
  };

  if (isEditing) {
    return (
      <UpdateConstraint
        type="edit"
        constraintObject={constraintObject}
        setIsEditing={setIsEditing}
      />
    );
  }

  return (
    <tr>
      <th>{moment().day(dayOfWeek).format("dddd")}</th>
      <td>
        {start}-{end}
      </td>
      <td>
        {formatType(type)} {constraint}
      </td>
      <td>{position}</td>
      <td>{department}</td>
      <td>
        <div className="grid grid-cols-2 gap-2">
          <button className="btn bg-primary" onClick={() => setIsEditing(true)}>
            <PencilSquareIcon className="h-5 w-5" />
          </button>
          <button
            className={`btn flex bg-red-600 ${isLoading && "loading"}`}
            onClick={handleDelete}
          >
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </td>
    </tr>
  );
};

export default ConstraintRow;
