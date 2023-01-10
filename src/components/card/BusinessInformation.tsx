import { useContext } from "react";
import { BusinessContext } from "@contexts/index";
import { AddButton } from "@components/button/index";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { DepartmentCard } from "@components/card/index";

const BusinessInformation = () => {
  const { departments } = useContext(BusinessContext);
  const [parent] = useAutoAnimate<HTMLUListElement>();

  return (
    <div className="card overflow-y-auto bg-base-100 shadow-2xl">
      <div className="card-body">
        <h2 className="card-title">Departments:</h2>
        <ul ref={parent} className="">
          {departments.map((department) => (
            <li key={department} className="card mb-4 w-full last:mb-2">
              <DepartmentCard name={department} />
            </li>
          ))}
        </ul>
        <AddButton />
      </div>
    </div>
  );
};

export default BusinessInformation;
