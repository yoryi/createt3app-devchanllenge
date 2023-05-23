import { useEffect } from "react";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";

import AuthLayout from "~/components/layout/AuthLayout";

export default function LoginPage() {
  const { status } = useSession();
  const router = useRouter();
  const { error } = router.query;

  useEffect(() => {
    console.log({ error });
    if (error === "OAuthAccountNotLinked") {
      toast.error(
        "Looks like you already have an account with us - please sign in with the same account you used to sign up.",
      );
    }
  }, [error]);

  if (status === "authenticated") {
    void router.push("/app");
    return;
  } else if (status === "loading") {
    return <div>Loading...</div>;
  }
  return <AuthLayout mode="login" onGoogleSignIn={onGoogleSignIn} />;

  function onGoogleSignIn() {
    signIn("cognito", {
      callbackUrl: `${window.location.origin}/app`,
    });
  }
}
