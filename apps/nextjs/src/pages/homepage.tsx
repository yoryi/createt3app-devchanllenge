import type { NextPage } from "next";

import Hero from "~/components/marketing/Hero";

const HomePage: NextPage = () => {
  return (
    <div className="bg-white h-[100vh]">
      <Hero />
    </div>
  );
};

export default HomePage;
