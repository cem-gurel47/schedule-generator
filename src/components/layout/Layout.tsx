import type { ReactNode } from "react";
import { useEffect } from "react";
import { themeChange } from "theme-change";

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  useEffect(() => {
    themeChange(false);
  }, []);
  return <div className="bg-base-200">{children}</div>;
};

export default Layout;
