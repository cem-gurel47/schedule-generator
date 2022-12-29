import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { themeChange } from "theme-change";
import { ThemeCard } from "@/components/card";
import { THEMES } from "@models/constants";

const SettingsPage: NextPage = () => {
  const [currentTheme, setCurrentTheme] = useState<string | null>(
    typeof window !== "undefined" ? localStorage.getItem("theme") : "dark"
  );

  const handleThemeChange = (theme: string) => {
    localStorage.setItem("theme", theme);
    setCurrentTheme(theme);
    themeChange(false);
  };

  return (
    <div className="py-12">
      <Head>
        <title>Settings</title>
        <meta name="description" content="Scheduler Dashboard Settings" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <section className="h-full">
          <h2 className="text-xl font-bold">Change Theme:</h2>
          <div
            className="gradientselect mt-6 grid gap-4 md:grid-cols-4 lg:grid-cols-6"
            data-choose-theme
          >
            {THEMES.map((theme) => (
              <ThemeCard
                key={theme}
                theme={theme}
                onClick={() => handleThemeChange(theme)}
                currentTheme={currentTheme}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SettingsPage;
