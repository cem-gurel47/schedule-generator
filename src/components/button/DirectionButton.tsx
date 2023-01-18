import type { ButtonHTMLAttributes } from "react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  direction: "left" | "right";
}

const DirectionButton = (props: Props) => {
  const { direction, ...rest } = props;
  return (
    <button
      className="btn bg-gradient-to-b from-violet-900 to-blue-900 duration-200 ease-in-out hover:opacity-80"
      {...rest}
    >
      {direction === "left" ? (
        <ArrowLeftIcon className="text-contrast h-5 w-5" />
      ) : (
        <ArrowRightIcon className="text-contrast h-5 w-5" />
      )}
    </button>
  );
};

export default DirectionButton;
