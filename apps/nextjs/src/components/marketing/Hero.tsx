/* eslint-disable @next/next/no-img-element */

import { useRouter } from "next/router";
import { Button } from "@mui/material";
import { EnterIcon } from "@radix-ui/react-icons";

export default function Hero() {
  const router = useRouter();
  return (
    <div className="bg-white">
      <div className="mt-[200px] gap-x-6">
        <h1 className="mt-10 text-4xl text-center font-bold tracking-tight text-gray-900 sm:text-6xl">
          Welcome to My Dev Challange
        </h1>
        <h3 className="mt-10 text-2xl text-center font-bold tracking-tight text-gray-900 sm:text-4xl">
          My name is Yoryi
        </h3>

        <div className="mt-[100px] text-center">
          <Button
            variant="outlined"
            color="primary"
            endIcon={<EnterIcon />}
            onClick={() => {
              router.push("/app");
            }}
          >
            Goto Main Page
          </Button>
        </div>
      </div>
    </div>
  );
}
