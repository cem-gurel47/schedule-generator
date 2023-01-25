import { useContext } from "react";
import { BusinessContext } from "@contexts/index";
import { AddButton } from "@components/button/index";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { PositionCard } from "@components/card/index";

const BusinessPositions = () => {
  const { positions } = useContext(BusinessContext);
  const [parent] = useAutoAnimate<HTMLUListElement>();

  return (
    <div className="card overflow-y-auto bg-base-100 shadow-2xl">
      <div className="card-body">
        <h2 className="card-title">Positions:</h2>
        <ul ref={parent} className="">
          {positions.map((position) => (
            <li key={position} className="card mb-4 w-full last:mb-2">
              <PositionCard name={position} />
            </li>
          ))}
        </ul>
        <AddButton variant="position" />
      </div>
    </div>
  );
};

export default BusinessPositions;
