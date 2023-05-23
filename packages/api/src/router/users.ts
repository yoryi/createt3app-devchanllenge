import { z } from "zod";

import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

export const usersRouter = createTRPCRouter({
  all: protectedProcedure.query(({ ctx }) => {}),
  update: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        password: z.string(),
        image: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      //Upload profile image to thirdparty...
      await ctx.prisma.user.create({
        data: {
          email: input.email,
          firstName: input.firstName,
          lastName: input.lastName,
          password: input.password,
          name: `${input.firstName} ${input.lastName}`,
        },
      });
    }),
});
