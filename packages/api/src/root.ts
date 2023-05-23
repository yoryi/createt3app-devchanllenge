import { authRouter } from "./router/auth";
import { usersRouter } from "./router/users";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  users: usersRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
