import { useContext } from "react";
import { ConstraintContext } from "@contexts/index";
import AddConstraintRow from "./AddConstraintRow";
import ConstraintRow from "./ConstraintRow";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const Constraints = () => {
  const { constraints } = useContext(ConstraintContext);
  const [parent] = useAutoAnimate<HTMLTableSectionElement>();

  return (
    <div className="overflow-x-auto">
      <table className="table-zebra table w-full">
        <thead>
          <tr>
            <th>Day</th>
            <th>Time</th>
            <th>Constraint</th>
            <th>Position</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody ref={parent}>
          {constraints.map((constraint) => (
            <ConstraintRow key={constraint.id} constraintObject={constraint} />
          ))}
          <AddConstraintRow type="add" />
        </tbody>
      </table>
    </div>
  );
};

export default Constraints;
