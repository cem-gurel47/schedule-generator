import type { ReactNode } from "react";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import { Mulish } from "@next/font/google";

const inter = Mulish({
  subsets: ["latin"],
});

type Props = {
  children: ReactNode;
};

const Layout = ({ children }: Props) => {
  useEffect(() => {
    themeChange(false);
  }, []);
  return <div className={`${inter.className}`}>{children}</div>;
};

export default Layout;
