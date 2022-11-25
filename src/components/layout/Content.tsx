import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function Content({ children }: Props) {
  return (
    <div className="z-[2] flex min-h-screen flex-col px-6">{children}</div>
  );
}

export default Content;
