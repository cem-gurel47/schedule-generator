import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  const backgroundShapePositions = [
    "bottom-[15%] right-[35%]",
    "top-[18%] right-[25%]",
    "bottom-[10%] left-[35%]",
    "top-[20%] left-[25%]",
    "top-[46%] right-[15%]",
    "bottom-[30%] left-[23%]",
  ];

  return (
    <>
      <Head>
        <title>Scheduler</title>
        <meta name="description" content="Scheduler for teams" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container z-[2] mx-auto -mt-24 flex min-h-screen max-w-6xl flex-col items-center justify-center p-4 text-center">
        <section>
          <h1 className="text-5xl font-extrabold leading-normal text-secondary md:text-7xl">
            Bring it all together
          </h1>
          <p className="my-5 max-w-[42ch] text-2xl font-light text-white">
            The fastest way to combine your favorite tools and APIs to build the
            fastest sites, stores, and apps for the web.
          </p>
          <ul className="flex items-center justify-center space-x-4">
            <li>
              <a
                role="button"
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                className="inline-flex items-center justify-center rounded-md border border-transparent bg-secondary px-6 py-2 text-base font-medium text-white shadow-sm transition duration-300 hover:bg-secondary"
              >
                Start building for free
              </a>
            </li>
            <li>
              <a
                role="button"
                href="https://vercel.com/import?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
                className="inline-flex items-center justify-center rounded-md border border-secondary px-6 py-2 font-medium text-secondary shadow-sm transition duration-300 hover:border-primary hover:text-primary"
              >
                Request demo
              </a>
            </li>
          </ul>
          {backgroundShapePositions.map((position) => (
            <BackgroundShape position={position} key={position} />
          ))}
        </section>
      </main>
    </>
  );
};

function BackgroundShape({ position }: { position: string }) {
  const defaultShape = `rounded-md bg-gray-200 w-[10vw] h-[10vh] absolute z-[-1]`;
  return <div className={`${defaultShape} ${position}`} />;
}

export default Home;
