import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  actionsContainer?: React.ReactNode;
}

const Success = (props: Props) => {
  const { title, description, icon, actionsContainer } = props;
  return (
    <div className="alert alert-success">
      <div>
        {icon}
        <div>
          <h3 className="font-bold">{title}</h3>
          {description && <div className="text-xs">{description}</div>}
        </div>
      </div>
      <div className="flex-none">{actionsContainer}</div>
    </div>
  );
};

export default Success;
