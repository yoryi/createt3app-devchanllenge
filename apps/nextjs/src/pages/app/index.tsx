import { NextPage } from "next";

import { Layout } from "~/components/layout/layout";

const Dashboard: NextPage = () => {
  return (
    <Layout>
      <h2 className="text-center mt-[100px] text-[30px] font-bold">
        Hello World
      </h2>
    </Layout>
  );
};

export default Dashboard;
