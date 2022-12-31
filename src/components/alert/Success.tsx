import React from "react";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  actionsContainer?: React.ReactNode;
}

const Success = (props: Props) => {
  const { title, description, actionsContainer } = props;
  return (
    <div className="alert alert-success">
      <div>
        <CheckBadgeIcon className="h-6 w-6" />
        <div className="flex flex-col items-baseline">
          <h3 className="font-bold">{title}</h3>
          {description && <div className="text-xs">{description}</div>}
        </div>
      </div>
      <div className="flex-none">{actionsContainer}</div>
    </div>
  );
};

export default Success;
