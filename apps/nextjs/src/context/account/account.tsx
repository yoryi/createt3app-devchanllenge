/* eslint-disable @typescript-eslint/no-unsafe-return */
import { createContext, useContext, useEffect, useState } from "react";

import { getLocalStorage, setLocalStorage } from "~/utils/helpers/localStorage";

/*
 * This is a custom context that is used to share data between components used in the Onboarding.
 */

/*
 * Curriculum store
 */

export type AccountContent = {
  firstName: string;
  setFirstName: (firstName: string) => void;
  email: string;
  setEmail: (email: string) => void;

  goal: string;
  setGoal: (goal: string) => void;
};

const AccountContext = createContext<AccountContent>({
  firstName: "",
  setFirstName: () => undefined,
  email: "",
  setEmail: () => undefined,
  goal: "",
  setGoal: () => undefined,
});

export function AccountWrapper({ children }: { children: React.ReactNode }) {
  const [firstName, setFirstName] = useState<string>(() =>
    getLocalStorage("firstName", ""),
  );
  const [email, setEmail] = useState<string>(() =>
    getLocalStorage("email", ""),
  );
  const [goal, setGoal] = useState<string>(() => getLocalStorage("goal", ""));

  useEffect(() => {
    setLocalStorage("firstName", firstName);
  }, [firstName]);

  useEffect(() => {
    setLocalStorage("email", email);
  }, [email]);

  useEffect(() => {
    setLocalStorage("goal", goal);
  }, [goal]);

  const sharedState: AccountContent = {
    firstName,
    setFirstName,
    email,
    setEmail,
    goal,
    setGoal,
  };
  return (
    <AccountContext.Provider value={sharedState}>
      {children}
    </AccountContext.Provider>
  );
}

export function useAccountContext() {
  return useContext(AccountContext);
}
