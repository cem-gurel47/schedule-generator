import { ButtonHTMLAttributes } from "react";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  theme: string;
  currentTheme: string | null;
}

const Theme = (props: Props) => {
  const { theme, currentTheme, ...rest } = props;

  return (
    <button
      value={theme}
      {...rest}
      className={`card bg-base-100 rounded-lg h-14 flex border-4 border-primary justify-center transition ease-in-out duration-100 items-center glass ${
        currentTheme === theme && "border-4"
      } hover:bg-base-300`}
      data-theme={theme}
    >
      <p className=" text-contrast font-bold text-lg">{theme}</p>
    </button>
  );
};

export default Theme;
