import type { ReactNode } from "react";
import { useContext } from "react";
import { BusinessContext } from "@contexts/index";
import Loading from "@components/container/Loading";

type Props = {
  children: ReactNode;
};

function Content({ children }: Props) {
  const { isLoading } = useContext(BusinessContext);
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="z-[2] flex min-h-screen flex-col px-6">{children}</div>
  );
}

export default Content;
